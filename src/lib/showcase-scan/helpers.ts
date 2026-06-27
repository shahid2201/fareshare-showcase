import "server-only";

import { ADDITIONAL_CHARGE_TERMS, CATEGORY_KEYWORDS } from "./constants";

export function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

export function inferCategory(name: string) {
  const lower = name.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      return category;
    }
  }

  return "Misc";
}

export function isAdditionalCharge(name: string) {
  const lower = name.toLowerCase();
  for (const term of Array.from(ADDITIONAL_CHARGE_TERMS)) {
    if (lower.includes(term)) {
      return true;
    }
  }
  return false;
}

export function isDiscount(name: string, priceAfterTax: number) {
  // Negative price always indicates a discount
  if (priceAfterTax < 0) {
    return true;
  }

  // Check name for discount keywords (case-insensitive)
  const lower = name.toLowerCase();
  const discountKeywords = [
    "promo",
    "coupon",
    "discount",
    "savings",
    "loyalty",
    "bogo",
    "price adjustment",
    "refund",
    "credit",
    "deduction",
  ];

  return discountKeywords.some((keyword) => lower.includes(keyword));
}

export function isTaxOrTotal(name: string) {
  const lower = name.toLowerCase().replace(/\s+/g, " ").trim();

  const taxTotalPatterns = [
    /\b(?:f\/?hst|f\s*hst|hst|gst|pst|qst|vat)\b/i,
    /\btax(?:es)?\b/i,
    /\b(?:sub\s*-?\s*total|subtotal|total(?:\s+amount)?|amount\s+due|total\s+due|balance\s+due|grand\s+total)\b/i,
    /\b\d{1,2}(?:\.\d+)?\s*%\s*tax\b/i,
    /\btax\s*\d{1,2}(?:\.\d+)?\s*%\b/i,
  ];

  return taxTotalPatterns.some((pattern) => pattern.test(lower));
}

export function extractFirstJsonObject(input: string) {
  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  const candidate = input.slice(start, end + 1);

  // Validate it's actually valid JSON before returning
  try {
    JSON.parse(candidate);
    return candidate;
  } catch {
    return null;
  }
}

function toIsoDate(year: number, month: number, day: number) {
  const candidate = new Date(Date.UTC(year, month - 1, day));

  if (
    candidate.getUTCFullYear() !== year ||
    candidate.getUTCMonth() !== month - 1 ||
    candidate.getUTCDate() !== day
  ) {
    return null;
  }

  return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

export function normalizeReceiptDate(input: string) {
  const value = input.trim();
  if (!value) {
    return null;
  }

  const isoMatch = value.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    return toIsoDate(Number(isoMatch[1]), Number(isoMatch[2]), Number(isoMatch[3]));
  }

  const slashMatch = value.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{2}|\d{4})/);
  if (slashMatch) {
    const month = Number(slashMatch[1]);
    const day = Number(slashMatch[2]);
    const rawYear = Number(slashMatch[3]);
    const year = rawYear < 100 ? 2000 + rawYear : rawYear;

    return toIsoDate(year, month, day);
  }

  return null;
}
