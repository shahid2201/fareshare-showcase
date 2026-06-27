/** Client-safe scan demo types — no pipeline internals or raw extraction data. */

export type ShowcaseScanItemReviewStatus = "ready" | "review";

export type ShowcaseConfidenceLabel = "High" | "Medium" | "Low";

export type ShowcaseScanItem = {
  id: string;
  name: string;
  category: string;
  price_after_tax: number;
  review_status: ShowcaseScanItemReviewStatus;
  confidence_label: ShowcaseConfidenceLabel;
};

export type ShowcaseScanSummary = {
  item_count: number;
  items_to_review: number;
  overall_review_status: "ready" | "review" | "mixed";
  confidence_label: ShowcaseConfidenceLabel;
};

export type ShowcaseScanResult = {
  merchant: string;
  date: string;
  total: number;
  summary: ShowcaseScanSummary;
  items: ShowcaseScanItem[];
  notices: string[];
};
