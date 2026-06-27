import {
  enforceSecureRoute,
  jsonError,
  jsonSuccess,
} from "@/lib/api-security";
import { ensureServerEnv } from "@/lib/env/bootstrap";
import {
  RECEIPT_MAX_BYTES,
  scanFileForThreats,
  validateReceiptFile,
} from "@/lib/file-upload";
import {
  isShowcaseScanAvailable,
  processReceiptForShowcase,
  ShowcaseScanError,
} from "@/lib/showcase-scan/process-receipt";

export async function POST(request: Request) {
  ensureServerEnv();

  const security = await enforceSecureRoute({
    request,
    requireCsrf: true,
    rateLimit: {
      limit: 10,
      windowMs: 60 * 60 * 1000,
    },
  });

  if (!security.ok) {
    return security.response;
  }

  if (!isShowcaseScanAvailable()) {
    return jsonError("Receipt scan demo is temporarily unavailable.", 503);
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("Invalid multipart form data.", 400);
  }

  const honeypot = String(formData.get("company") ?? "");
  if (honeypot.trim()) {
    return jsonSuccess({ ok: true, scan: null });
  }

  const fileEntry = formData.get("file");
  if (!(fileEntry instanceof File)) {
    return jsonError("A receipt file is required.", 400);
  }

  if (fileEntry.size > RECEIPT_MAX_BYTES) {
    return jsonError("File exceeds the 5 MB limit.", 400);
  }

  const buffer = Buffer.from(await fileEntry.arrayBuffer());
  const validation = validateReceiptFile(fileEntry, buffer);

  if (!validation.ok) {
    return jsonError(validation.error, 400);
  }

  const scanResult = await scanFileForThreats(buffer, validation.sha256);
  if (!scanResult.safe) {
    return jsonError(scanResult.reason, 400);
  }

  try {
    const scan = await processReceiptForShowcase(buffer, validation.mimeType);

    return jsonSuccess({
      ok: true,
      scan,
    });
  } catch (error) {
    if (error instanceof ShowcaseScanError) {
      return jsonError(error.message, 422);
    }

    console.error("[receipts/upload] scan failed", error);
    return jsonError("Unable to scan this receipt right now.", 500);
  }
}
