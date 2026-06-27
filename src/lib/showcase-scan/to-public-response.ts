import "server-only";

import { randomUUID } from "node:crypto";

import type { ProcessedItem } from "./types";
import type {
  ShowcaseConfidenceLabel,
  ShowcaseScanItem,
  ShowcaseScanResult,
  ShowcaseScanSummary,
} from "./public-types";
import { normalizeReceiptDate, roundCurrency } from "./helpers";

type BuildPublicScanInput = {
  merchant: string;
  date: string;
  total: number;
  items: ProcessedItem[];
  duplicateDetected: boolean;
};

function confidenceLabelForScore(score: number): ShowcaseConfidenceLabel {
  if (score >= 0.8) {
    return "High";
  }

  if (score >= 0.6) {
    return "Medium";
  }

  return "Low";
}

function reviewStatusForScore(score: number): "ready" | "review" {
  return score >= 0.6 ? "ready" : "review";
}

function buildSummary(items: ShowcaseScanItem[]): ShowcaseScanSummary {
  const itemsToReview = items.filter((item) => item.review_status === "review").length;
  const labels = items.map((item) => item.confidence_label);

  let confidenceLabel: ShowcaseConfidenceLabel = "High";
  if (labels.includes("Low")) {
    confidenceLabel = "Low";
  } else if (labels.includes("Medium")) {
    confidenceLabel = "Medium";
  }

  let overallReviewStatus: ShowcaseScanSummary["overall_review_status"] = "ready";
  if (itemsToReview === items.length && items.length > 0) {
    overallReviewStatus = "review";
  } else if (itemsToReview > 0) {
    overallReviewStatus = "mixed";
  }

  return {
    item_count: items.length,
    items_to_review: itemsToReview,
    overall_review_status: overallReviewStatus,
    confidence_label: confidenceLabel,
  };
}

export function toPublicScanResponse(input: BuildPublicScanInput): ShowcaseScanResult {
  const items: ShowcaseScanItem[] = input.items.map((item) => ({
    id: randomUUID(),
    name: item.name,
    category: item.category,
    price_after_tax: roundCurrency(item.price_after_tax),
    review_status: reviewStatusForScore(item.confidence),
    confidence_label: confidenceLabelForScore(item.confidence),
  }));

  const summary = buildSummary(items);
  const notices: string[] = [];

  if (summary.items_to_review > 0) {
    const noun = summary.items_to_review === 1 ? "item needs" : "items need";
    notices.push(`${summary.items_to_review} ${noun} a quick review before saving.`);
  }

  if (input.duplicateDetected) {
    notices.push("This receipt may look similar to one you scanned recently.");
  }

  if (items.length === 0) {
    notices.push("No line items were detected. Try a clearer photo with the full receipt visible.");
  }

  return {
    merchant: input.merchant || "Unknown merchant",
    date: normalizeReceiptDate(input.date) ?? "Date unavailable",
    total: roundCurrency(input.total),
    summary,
    items,
    notices,
  };
}
