import "server-only";

import { createSign } from "node:crypto";

import { ParsedReceipt } from "./types";
import { normalizeName, roundCurrency, isTaxOrTotal } from "./helpers";

type DocAIResult = {
  parsed: ParsedReceipt;
  raw: unknown;
};

type LooseRecord = Record<string, unknown>;

type ExtractedItem = {
  name: string;
  price: number;
  quantity?: number;
};

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
  project_id?: string;
};

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CLOUD_PLATFORM_SCOPE = "https://www.googleapis.com/auth/cloud-platform";

let cachedAccessToken: TokenCache | null = null;

function base64UrlEncode(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function getLegacyDocAiConfig() {
  const endpoint = process.env.GOOGLE_DOCAI_ENDPOINT;
  const bearerToken = process.env.GOOGLE_DOCAI_BEARER_TOKEN;

  if (!endpoint || !bearerToken) {
    return null;
  }

  return { endpoint, bearerToken };
}

function parseServiceAccountCredentials(): ServiceAccountCredentials {
  const rawJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON?.trim();

  if (!rawJson) {
    throw new Error(
      "Missing GOOGLE_APPLICATION_CREDENTIALS_JSON. Provide the Google service account JSON so the backend can generate a Document AI access token.",
    );
  }

  try {
    const parsed = JSON.parse(rawJson) as Partial<ServiceAccountCredentials>;
    const clientEmail = parsed.client_email?.trim();
    const privateKey = parsed.private_key?.replace(/\\n/g, "\n").trim();

    if (!clientEmail || !privateKey) {
      throw new Error("Service account JSON must include client_email and private_key.");
    }

    return {
      client_email: clientEmail,
      private_key: privateKey,
      project_id: parsed.project_id?.trim(),
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Invalid GOOGLE_APPLICATION_CREDENTIALS_JSON: ${error.message}`
        : "Invalid GOOGLE_APPLICATION_CREDENTIALS_JSON.",
    );
  }
}

function buildDocumentAiEndpoint(credentials: ServiceAccountCredentials) {
  const projectId = process.env.GOOGLE_DOCAI_PROJECT_ID?.trim() || credentials.project_id;
  const location = process.env.GOOGLE_DOCAI_LOCATION?.trim();
  const processorId = process.env.GOOGLE_DOCAI_PROCESSOR_ID?.trim();

  if (!projectId || !location || !processorId) {
    throw new Error(
      "Missing GOOGLE_DOCAI_PROJECT_ID, GOOGLE_DOCAI_LOCATION, or GOOGLE_DOCAI_PROCESSOR_ID. The backend builds GOOGLE_DOCAI_ENDPOINT from those values.",
    );
  }

  return `https://${location}-documentai.googleapis.com/v1/projects/${projectId}/locations/${location}/processors/${processorId}:process`;
}

async function generateAccessToken(credentials: ServiceAccountCredentials) {
  const nowInSeconds = Math.floor(Date.now() / 1000);

  if (cachedAccessToken && cachedAccessToken.expiresAt - 60 > nowInSeconds) {
    return cachedAccessToken.accessToken;
  }

  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claimSet = base64UrlEncode(
    JSON.stringify({
      iss: credentials.client_email,
      scope: GOOGLE_CLOUD_PLATFORM_SCOPE,
      aud: GOOGLE_OAUTH_TOKEN_URL,
      exp: nowInSeconds + 3600,
      iat: nowInSeconds,
    }),
  );

  const unsignedJwt = `${header}.${claimSet}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedJwt);
  signer.end();

  const signature = signer
    .sign(credentials.private_key, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  const assertion = `${unsignedJwt}.${signature}`;

  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to generate Google access token: ${response.status} ${text}`);
  }

  const payload = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!payload.access_token) {
    throw new Error("Google OAuth response did not include access_token.");
  }

  cachedAccessToken = {
    accessToken: payload.access_token,
    expiresAt: nowInSeconds + Number(payload.expires_in || 3600),
  };

  return payload.access_token;
}

function toNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.-]/g, "");
    const parsed = Number(cleaned);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}

function asRecord(value: unknown): LooseRecord | null {
  return value && typeof value === "object" ? (value as LooseRecord) : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function getString(record: LooseRecord | null, key: string) {
  const value = record?.[key];
  return typeof value === "string" ? value : "";
}

function getEntityMention(entity: LooseRecord | null) {
  const normalizedValue = asRecord(entity?.normalizedValue);
  return (
    getString(entity, "mentionText") ||
    getString(normalizedValue, "text") ||
    getString(normalizedValue, "dateValue")
  );
}

function getEntityNumber(entity: LooseRecord | null) {
  const normalizedValue = asRecord(entity?.normalizedValue);
  const moneyValue = asRecord(normalizedValue?.moneyValue);

  if (moneyValue) {
    const units = Number(moneyValue.units ?? 0);
    const nanos = Number(moneyValue.nanos ?? 0);
    const candidate = units + nanos / 1_000_000_000;
    if (Number.isFinite(candidate)) {
      return candidate;
    }
  }

  const fromText = toNumber(getEntityMention(entity));
  return Number.isFinite(fromText) ? fromText : 0;
}

function entityTypeMatches(entityType: string, expectedTypes: string[]) {
  const normalized = entityType.toLowerCase();
  return expectedTypes.some((expected) => normalized === expected || normalized.endsWith(`/${expected}`));
}

function getEntityByType(entities: unknown[], expectedTypes: string[]) {
  for (const rawEntity of entities) {
    const entity = asRecord(rawEntity);
    const entityType = getString(entity, "type");
    if (entityType && entityTypeMatches(entityType, expectedTypes)) {
      return entity;
    }
  }

  return null;
}

function extractItemsFromUnknown(raw: unknown): ExtractedItem[] {
  const root = asRecord(raw);
  const document = asRecord(root?.document);
  const entities = asArray(document?.entities);

  const lineItemEntities = entities.filter((entity) => {
    const entry = asRecord(entity);
    return getString(entry, "type") === "line_item";
  });

  const candidates = asArray(root?.items).length
    ? asArray(root?.items)
    : asArray(document?.items).length
      ? asArray(document?.items)
      : lineItemEntities;

  const extracted = candidates.map((candidate) => {
    const item = asRecord(candidate);
    const type = getString(item, "type");

    if (type === "line_item") {
      const normalizedValue = asRecord(item?.normalizedValue);
      const properties = asArray(item?.properties).map((property) => asRecord(property));
      const amountProperty = properties.find((property) =>
        /amount|price|total/i.test(getString(property, "type")),
      );
      const quantityProperty = properties.find((property) =>
        /quantity|qty/i.test(getString(property, "type")),
      );

      return {
        name: normalizeName(
          getString(item, "mentionText") || getString(normalizedValue, "text") || "Item",
        ),
        price: toNumber(amountProperty?.mentionText),
        quantity: toNumber(quantityProperty?.mentionText),
      };
    }

    return {
      name: normalizeName(getString(item, "name") || getString(item, "description") || "Item"),
      price: toNumber(item?.price ?? item?.amount ?? item?.total),
      quantity: toNumber(item?.quantity) || 1,
    };
  });

  return extracted.filter((item) => item.name && item.price >= 0 && !isTaxOrTotal(item.name));
}

export async function scanWithDocumentAI(base64Image: string, mimeType: string): Promise<DocAIResult> {
  const legacyConfig = getLegacyDocAiConfig();
  const credentials = parseServiceAccountCredentials();
  const endpoint = legacyConfig?.endpoint || buildDocumentAiEndpoint(credentials);
  const bearerToken = legacyConfig?.bearerToken || (await generateAccessToken(credentials));

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({
      rawDocument: {
        content: base64Image,
        mimeType,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Document AI request failed: ${response.status} ${text}`);
  }

  const raw = (await response.json()) as unknown;
  const root = asRecord(raw);
  const document = asRecord(root?.document);
  const summary = asRecord(document?.summary);
  const entities = asArray(document?.entities);
  const merchantEntity = getEntityByType(entities, ["merchant_name", "supplier_name", "vendor_name", "store_name", "merchant"]);
  const dateEntity = getEntityByType(entities, ["purchase_date", "invoice_date", "receipt_date", "date"]);
  const totalEntity = getEntityByType(entities, ["total_amount", "amount_due", "invoice_total", "total"]);
  const taxEntity = getEntityByType(entities, ["total_tax_amount", "tax_amount", "tax"]);
  const items = extractItemsFromUnknown(raw);
  const total =
    toNumber(root?.total ?? document?.totalAmount ?? summary?.total) || getEntityNumber(totalEntity);
  const taxes =
    toNumber(root?.taxes ?? document?.taxAmount ?? summary?.tax) || getEntityNumber(taxEntity);
  const merchant =
    normalizeName(
      getString(root, "merchant") || getString(document, "merchantName") || getEntityMention(merchantEntity),
    ) || "Unknown Merchant";
  const date =
    getString(root, "date") ||
    getString(document, "date") ||
    getEntityMention(dateEntity) ||
    new Date().toISOString().slice(0, 10);

  const parsed: ParsedReceipt = {
    merchant,
    date,
    taxes: roundCurrency(taxes),
    total: roundCurrency(total || items.reduce((sum, item) => sum + item.price, 0)),
    items,
    raw,
  };

  return { parsed, raw };
}
