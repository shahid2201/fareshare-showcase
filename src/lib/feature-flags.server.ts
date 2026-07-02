import "server-only";

/**
 * Receipt scan demo is disabled by default. Set RECEIPT_SCAN_DEMO_ENABLED=true
 * only in controlled environments — never on the public showcase.
 */
export function isReceiptScanDemoEnabled(): boolean {
  return process.env.RECEIPT_SCAN_DEMO_ENABLED === "true";
}

export function isTurnstileConfigured(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim(),
  );
}
