/** Canonical public site identity for metadata, sitemap, and GEO assets. */

export const SITE_NAME = "FareShare";

export const DEFAULT_TITLE = "FareShare — Split Life's Costs. Effortlessly.";

export const DEFAULT_DESCRIPTION =
  "Scan receipts. Extract items. Assign shares. Settle instantly. FareShare makes splitting bills feel like clarity, not math.";

/** Short, citation-ready definition for GEO and structured data. */
export const BRAND_DEFINITION =
  "FareShare is a bill-splitting app that scans receipts, extracts line items, lets people assign shares, and tracks settlement — built for households, roommates, couples, and shared expenses.";

export const BRAND_TAGLINE = "Split life's costs. Effortlessly.";

export const DEFAULT_KEYWORDS = [
  "bill splitting",
  "receipt scanner",
  "expense sharing",
  "roommate expenses",
  "itemized bill split",
  "FareShare",
] as const;

export function getSiteUrl(): string {
  const configured =
    process.env.SHOWCASE_SITE_URL?.trim() ??
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ??
    process.env.APP_BASE_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    return "https://fareshare.app";
  }

  const port = process.env.PORT?.trim() || "3000";
  return `http://localhost:${port}`;
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") {
    return `${base}/`;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
