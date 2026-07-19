import type { ClusterDocument } from "@/lib/seo/cluster-types";

export const VS_PAGES: Record<string, ClusterDocument> = {
  splitwise: {
    slug: "splitwise",
    path: "/vs/splitwise",
    eyebrow: "Compare",
    title: "FareShare vs Splitwise",
    description:
      "A fair comparison of FareShare and Splitwise: balance tracking vs receipt-first itemized splits for households and shared expenses.",
    keywords: [
      "FareShare vs Splitwise",
      "Splitwise alternative",
      "receipt splitting app vs Splitwise",
      "itemized split vs Splitwise",
    ],
    definition:
      "Splitwise is widely used for tracking shared balances. FareShare is a pre-launch bill-splitting product focused on scanning receipts and assigning shares per line item, especially for households.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "reviewed",
        title: "Last reviewed",
        paragraphs: [
          "This comparison was last reviewed on July 19, 2026. FareShare is pre-launch; Splitwise features may change. We update this page when our positioning or public facts change.",
        ],
      },
      {
        id: "summary",
        title: "Quick summary",
        paragraphs: [
          "Splitwise helped popularize shared expense balances and group IOUs. FareShare is building around a different starting point: the receipt itself — scan, review line items, assign shares, then settle.",
          "Neither approach is universally “better.” The right tool depends on whether your pain is balance tracking, receipt itemization, or household rhythm.",
        ],
      },
      {
        id: "splitwise",
        title: "Where Splitwise is strong",
        paragraphs: [
          "Splitwise is established, widely known, and effective for logging shared expenses and seeing who owes whom across groups. Many people already have a history there.",
        ],
        bullets: [
          "Mature balance tracking mental model",
          "Broad existing user familiarity",
          "Works well when you already know the amounts to enter",
        ],
      },
      {
        id: "fareshare",
        title: "Where FareShare is focused",
        paragraphs: [
          "FareShare emphasizes getting from a physical or photo receipt to an itemized, assignable bill — with review before sharing — and household use cases as a primary design center.",
        ],
        bullets: [
          "Receipt scanning into line items",
          "Per-item assignment before settlement",
          "Household and roommate workflows as a core scenario",
          "Explicit review step for extracted data",
        ],
      },
      {
        id: "honest",
        title: "Honest caveats",
        paragraphs: [
          "FareShare is pre-launch; feature sets will evolve. This page is product positioning, not a claim that FareShare replaces every Splitwise workflow today. Splitwise remains a solid choice for many balance-tracking needs.",
          "Join the FareShare waitlist if receipt-first itemized splits for households sound like your problem. Pricing will be announced before release; waitlist signup is not a purchase.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is FareShare a Splitwise alternative?",
        answer:
          "FareShare can be an alternative if you want receipt scanning and itemized assignment first. If you mainly need classic shared balances without receipt workflows, Splitwise may still fit better.",
      },
      {
        question: "Can I migrate from Splitwise?",
        answer:
          "Migration tooling is not part of this marketing site. Launch communications to waitlist members will cover onboarding details as they become available.",
      },
    ],
    relatedLinks: [
      { href: "/vs/venmo", label: "FareShare vs Venmo" },
      { href: "/vs/spreadsheets", label: "FareShare vs spreadsheets" },
      { href: "/features/itemized-splits", label: "Itemized splits" },
      { href: "/features/receipt-scanner", label: "Receipt scanner" },
      { href: "/for/roommates", label: "For roommates" },
      { href: "/faq", label: "FAQ" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "FareShare vs Splitwise", path: "/vs/splitwise" },
    ],
  },
  venmo: {
    slug: "venmo",
    path: "/vs/venmo",
    eyebrow: "Compare",
    title: "FareShare vs Venmo",
    description:
      "Venmo moves money. FareShare is being built to figure out who owes what from receipts first — then settle. Here’s how they differ.",
    keywords: [
      "FareShare vs Venmo",
      "Venmo for splitting bills",
      "split bills without Venmo math",
      "receipt splitter vs Venmo",
    ],
    definition:
      "Venmo is a payments app for sending money. FareShare is a pre-launch bill-splitting product focused on scanning receipts and assigning itemized shares before settlement.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "reviewed",
        title: "Last reviewed",
        paragraphs: [
          "This comparison was last reviewed on July 19, 2026. Availability and features vary by region and product updates.",
        ],
      },
      {
        id: "summary",
        title: "Different jobs",
        paragraphs: [
          "Venmo excels at transferring money between people. It does not replace the hard part of many shared bills: turning a receipt into fair shares.",
          "FareShare is aimed at that earlier job — itemized clarity — with settlement flows handled through licensed payment providers when available. FareShare is not a Venmo replacement for general peer payments.",
        ],
      },
      {
        id: "together",
        title: "How people use both today",
        paragraphs: [
          "Many groups still calculate shares manually (or in a notes app), then Venmo the result. FareShare is designed to reduce the manual calculation step before money moves.",
        ],
      },
      {
        id: "honest",
        title: "Honest caveats",
        paragraphs: [
          "If you only need to send a known amount, Venmo (or similar) may be enough. If your pain is receipt math among roommates or friends, a splitter workflow matters more than the payment rail alone.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does FareShare replace Venmo?",
        answer:
          "No. FareShare focuses on receipt-based splitting and settlement records. Peer payment apps remain useful for moving money; FareShare is not positioning itself as a general-purpose payments social network.",
      },
    ],
    relatedLinks: [
      { href: "/vs/splitwise", label: "FareShare vs Splitwise" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/for/friends-and-trips", label: "For friends & trips" },
      { href: "/security-privacy", label: "Security & privacy" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "FareShare vs Venmo", path: "/vs/venmo" },
    ],
  },
  spreadsheets: {
    slug: "spreadsheets",
    path: "/vs/spreadsheets",
    eyebrow: "Compare",
    title: "FareShare vs spreadsheets for shared expenses",
    metaTitle: "FareShare vs Spreadsheets",
    description:
      "Spreadsheets can track shared expenses — until nobody updates them. See when a receipt-first splitter is clearer for households.",
    keywords: [
      "expense spreadsheet vs app",
      "roommate expense spreadsheet",
      "FareShare vs Excel",
      "shared expenses Google Sheets",
    ],
    definition:
      "Spreadsheets can track shared expenses manually. FareShare is being built to start from receipts and itemized assignment so households spend less time maintaining a ledger by hand.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "reviewed",
        title: "Last reviewed",
        paragraphs: ["This comparison was last reviewed on July 19, 2026."],
      },
      {
        id: "sheets",
        title: "Where spreadsheets win",
        paragraphs: [
          "Full control, custom formulas, and zero new app — great for finance-minded households who enjoy maintaining a sheet.",
        ],
      },
      {
        id: "cost",
        title: "Where spreadsheets fail",
        paragraphs: [
          "Someone has to enter every line. Receipts pile up. The sheet drifts from reality. New roommates inherit a maze. The tool is powerful; the process is fragile.",
        ],
      },
      {
        id: "fareshare",
        title: "FareShare’s bet",
        paragraphs: [
          "Start from the receipt, review extracted lines, assign shares, settle. Less empty rows, more shared context. Spreadsheets remain excellent for budgets; they are a weak default UI for weekly grocery fairness.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/guides/roommate-expense-system", label: "Roommate expense system" },
      { href: "/for/roommates", label: "For roommates" },
      { href: "/features/receipt-scanner", label: "Receipt scanner" },
      { href: "/vs/splitwise", label: "vs Splitwise" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "vs spreadsheets", path: "/vs/spreadsheets" },
    ],
  },
};

export function getVsPage(slug: string): ClusterDocument | undefined {
  return VS_PAGES[slug];
}

export function listVsSlugs(): string[] {
  return Object.keys(VS_PAGES);
}
