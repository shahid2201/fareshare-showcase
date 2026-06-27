export const RECEIPT_MAX_BYTES = 5 * 1024 * 1024;

export const ALLOWED_RECEIPT_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

export type AllowedReceiptMimeType =
  (typeof ALLOWED_RECEIPT_MIME_TYPES)[number];
