import "server-only";

import { scanWithDocumentAI } from "./docai";
import { finalizeProcessedItems, processWithDeepSeek } from "./deepseek";
import { roundCurrency } from "./helpers";
import type { ShowcaseScanResult } from "./public-types";
import { toPublicScanResponse } from "./to-public-response";

export class ShowcaseScanError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShowcaseScanError";
  }
}

export function isShowcaseScanAvailable(): boolean {
  const legacyEndpoint = process.env.GOOGLE_DOCAI_ENDPOINT?.trim();
  const legacyToken = process.env.GOOGLE_DOCAI_BEARER_TOKEN?.trim();
  if (legacyEndpoint && legacyToken) {
    return true;
  }

  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON?.trim();
  const location = process.env.GOOGLE_DOCAI_LOCATION?.trim();
  const processorId = process.env.GOOGLE_DOCAI_PROCESSOR_ID?.trim();
  const projectId = process.env.GOOGLE_DOCAI_PROJECT_ID?.trim();

  if (!credentialsJson || !location || !processorId) {
    return false;
  }

  if (projectId) {
    return true;
  }

  try {
    const parsed = JSON.parse(credentialsJson) as { project_id?: string };
    return Boolean(parsed.project_id?.trim());
  } catch {
    return false;
  }
}

export async function processReceiptForShowcase(
  buffer: Buffer,
  mimeType: string,
): Promise<ShowcaseScanResult> {
  const base64Image = buffer.toString("base64");

  let parsed;
  try {
    ({ parsed } = await scanWithDocumentAI(base64Image, mimeType));
  } catch (error) {
    console.error("[showcase-scan] document read failed", error);
    throw new ShowcaseScanError(
      "We could not read this receipt. Try a clearer photo with good lighting.",
    );
  }

  let deepSeekResult;
  try {
    deepSeekResult = await processWithDeepSeek(parsed);
  } catch (error) {
    console.error("[showcase-scan] item processing failed", error);
    throw new ShowcaseScanError(
      "We could not organize the line items. Please try again in a moment.",
    );
  }

  const processedItems = finalizeProcessedItems(deepSeekResult.items);
  const itemTotal = roundCurrency(
    processedItems.reduce((sum, item) => sum + item.price_after_tax, 0),
  );
  const total = parsed.total > 0 ? roundCurrency(parsed.total) : itemTotal;

  return toPublicScanResponse({
    merchant: parsed.merchant,
    date: parsed.date,
    total,
    items: processedItems,
    duplicateDetected: Boolean(deepSeekResult.duplicate?.is_duplicate),
  });
}
