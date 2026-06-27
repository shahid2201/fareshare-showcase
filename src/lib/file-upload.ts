import { createHash } from "crypto";
import {
  ALLOWED_RECEIPT_MIME_TYPES,
  RECEIPT_MAX_BYTES,
  type AllowedReceiptMimeType,
} from "./file-upload/constants";

export {
  ALLOWED_RECEIPT_MIME_TYPES,
  RECEIPT_MAX_BYTES,
  type AllowedReceiptMimeType,
} from "./file-upload/constants";

const MIME_SIGNATURES: Record<AllowedReceiptMimeType, number[][]> = {
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png": [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]],
  "application/pdf": [[0x25, 0x50, 0x44, 0x46]],
};

function matchesSignature(buffer: Buffer, signature: number[]): boolean {
  if (buffer.length < signature.length) {
    return false;
  }

  return signature.every((byte, index) => buffer[index] === byte);
}

function detectMimeType(buffer: Buffer): AllowedReceiptMimeType | null {
  for (const mimeType of ALLOWED_RECEIPT_MIME_TYPES) {
    const signatures = MIME_SIGNATURES[mimeType];
    const matches = signatures.some((signature) =>
      matchesSignature(buffer, signature)
    );

    if (!matches) {
      continue;
    }

    if (mimeType === "image/webp") {
      const webpMarker = buffer.subarray(8, 12).toString("ascii");
      if (webpMarker !== "WEBP") {
        continue;
      }
    }

    return mimeType;
  }

  return null;
}

function hasSuspiciousPdfContent(buffer: Buffer): boolean {
  const content = buffer.subarray(0, Math.min(buffer.length, 8192)).toString(
    "latin1"
  );

  return /\/(?:JavaScript|JS|Launch|OpenAction|AA)\b/i.test(content);
}

export type FileValidationResult =
  | {
      ok: true;
      mimeType: AllowedReceiptMimeType;
      sha256: string;
    }
  | {
      ok: false;
      error: string;
    };

export function validateReceiptFile(
  file: File,
  buffer: Buffer
): FileValidationResult {
  if (file.size <= 0) {
    return { ok: false, error: "File is empty." };
  }

  if (file.size > RECEIPT_MAX_BYTES) {
    return { ok: false, error: "File exceeds the 5 MB limit." };
  }

  if (buffer.length > RECEIPT_MAX_BYTES) {
    return { ok: false, error: "File exceeds the 5 MB limit." };
  }

  const detectedMimeType = detectMimeType(buffer);
  if (!detectedMimeType) {
    return {
      ok: false,
      error: "Unsupported file type. Upload JPEG, PNG, WebP, or PDF.",
    };
  }

  if (
    file.type &&
    file.type !== "application/octet-stream" &&
    file.type !== detectedMimeType
  ) {
    return { ok: false, error: "File content does not match its type." };
  }

  if (
    detectedMimeType === "application/pdf" &&
    hasSuspiciousPdfContent(buffer)
  ) {
    return { ok: false, error: "PDF contains disallowed active content." };
  }

  const sha256 = createHash("sha256").update(buffer).digest("hex");

  return {
    ok: true,
    mimeType: detectedMimeType,
    sha256,
  };
}

export function getReceiptExtension(mimeType: AllowedReceiptMimeType): string {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "application/pdf":
      return "pdf";
  }
}

type VirusScanResult =
  | { safe: true; provider: "structural" | "virustotal" }
  | { safe: false; provider: "structural" | "virustotal"; reason: string };

export async function scanFileForThreats(
  buffer: Buffer,
  sha256: string
): Promise<VirusScanResult> {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;

  if (!apiKey) {
    return { safe: true, provider: "structural" };
  }

  try {
    const lookupResponse = await fetch(
      `https://www.virustotal.com/api/v3/files/${sha256}`,
      {
        headers: { "x-apikey": apiKey },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (lookupResponse.status === 404) {
      const formData = new FormData();
      formData.append(
        "file",
        new Blob([new Uint8Array(buffer)]),
        "upload.bin"
      );

      const uploadResponse = await fetch(
        "https://www.virustotal.com/api/v3/files",
        {
          method: "POST",
          headers: { "x-apikey": apiKey },
          body: formData,
          signal: AbortSignal.timeout(15000),
        }
      );

      if (!uploadResponse.ok) {
        return {
          safe: false,
          provider: "virustotal",
          reason: "Unable to scan file for malware.",
        };
      }

      return { safe: true, provider: "virustotal" };
    }

    if (!lookupResponse.ok) {
      return {
        safe: false,
        provider: "virustotal",
        reason: "Unable to scan file for malware.",
      };
    }

    const payload = (await lookupResponse.json()) as {
      data?: {
        attributes?: {
          last_analysis_stats?: {
            malicious?: number;
            suspicious?: number;
          };
        };
      };
    };

    const stats = payload.data?.attributes?.last_analysis_stats;
    const malicious = stats?.malicious ?? 0;
    const suspicious = stats?.suspicious ?? 0;

    if (malicious > 0 || suspicious > 0) {
      return {
        safe: false,
        provider: "virustotal",
        reason: "File flagged as potentially malicious.",
      };
    }

    return { safe: true, provider: "virustotal" };
  } catch {
    return {
      safe: false,
      provider: "virustotal",
      reason: "Malware scan timed out.",
    };
  }
}
