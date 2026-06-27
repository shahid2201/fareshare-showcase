"use client";

import { AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import type { ShowcaseScanResult } from "@/lib/showcase-scan/public-types";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

function confidenceBadgeClass(label: string) {
  if (label === "High") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  }

  if (label === "Medium") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  }

  return "border-red-500/30 bg-red-500/10 text-red-300";
}

interface ReceiptScanReviewProps {
  result: ShowcaseScanResult;
  className?: string;
}

export function ReceiptScanReview({ result, className }: ReceiptScanReviewProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-xl shadow-black/30",
        className,
      )}
    >
      <div className="border-b border-white/5 p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-zinc-100">{result.merchant}</p>
            <p className="mt-1 text-sm text-zinc-500">{result.date}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Total</p>
            <p className="text-xl font-semibold text-emerald-400">
              {currency.format(result.total)}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium",
              confidenceBadgeClass(result.summary.confidence_label),
            )}
          >
            Confidence {result.summary.confidence_label}
          </span>
          <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 text-xs text-zinc-400">
            {result.summary.item_count} item{result.summary.item_count === 1 ? "" : "s"}
          </span>
          {result.summary.items_to_review > 0 ? (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs text-amber-300">
              {result.summary.items_to_review} to review
            </span>
          ) : null}
        </div>
      </div>

      {result.notices.length > 0 ? (
        <div className="space-y-2 border-b border-white/5 bg-zinc-950/40 p-4 md:p-5">
          {result.notices.map((notice) => (
            <div
              key={notice}
              className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-100/90"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>{notice}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="border-b border-white/5 p-4 md:p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky-400" />
          <p className="text-sm font-medium text-zinc-200">Review before saving</p>
        </div>
        <p className="text-xs text-zinc-500">
          In the app, you confirm each line item, fix low-confidence reads, and save when everything
          looks right.
        </p>
      </div>

      <ul className="divide-y divide-white/5">
        {result.items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "flex items-start justify-between gap-3 px-4 py-3 md:px-5",
              item.review_status === "review" && "bg-amber-500/5",
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-100">{item.name}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{item.category}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-emerald-400">
                {currency.format(item.price_after_tax)}
              </p>
              <div className="mt-1 flex flex-wrap justify-end gap-1">
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                    confidenceBadgeClass(item.confidence_label),
                  )}
                >
                  {item.confidence_label}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                    item.review_status === "ready"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-300",
                  )}
                >
                  {item.review_status === "ready" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <AlertTriangle className="h-3 w-3" />
                  )}
                  {item.review_status === "ready" ? "Ready" : "Review"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {result.items.length === 0 ? (
        <p className="p-4 text-sm text-zinc-500 md:p-5">
          No line items to show yet. Try another photo with the full receipt in frame.
        </p>
      ) : null}
    </div>
  );
}
