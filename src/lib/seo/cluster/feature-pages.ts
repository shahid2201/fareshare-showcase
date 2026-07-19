import type { ClusterDocument } from "@/lib/seo/cluster-types";

export const FEATURE_PAGES: Record<string, ClusterDocument> = {
  "receipt-scanner": {
    slug: "receipt-scanner",
    path: "/features/receipt-scanner",
    eyebrow: "Feature",
    title: "Receipt scanner for fair bill splits",
    description:
      "FareShare’s receipt scanner captures line items from real receipts so you can review, assign shares, and settle — instead of typing every item by hand.",
    keywords: [
      "receipt scanner app",
      "scan receipt split bill",
      "OCR bill splitting",
      "FareShare receipt scanner",
    ],
    definition:
      "FareShare’s receipt scanner captures receipts with a camera, extracts line items for review, and feeds the itemized split workflow used to assign shares and settle.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "what",
        title: "What the scanner is for",
        paragraphs: [
          "Typing a full grocery or restaurant receipt by hand is slow and error-prone. Scanning gets you to line items faster so the real work — fair assignment — can start sooner.",
        ],
      },
      {
        id: "review",
        title: "Review is part of the product",
        paragraphs: [
          "Extraction can be incomplete or inaccurate. FareShare is designed so you review and correct items before sharing or paying. That human checkpoint is intentional, not a footnote.",
        ],
        bullets: [
          "Capture with camera",
          "Extract merchants, lines, and totals where possible",
          "Flag items that need a closer look",
          "Edit before anyone settles",
        ],
      },
      {
        id: "website",
        title: "Website vs app",
        paragraphs: [
          "This website explains the product and hosts the waitlist. Live scanning belongs in the FareShare mobile app at launch. Marketing previews may use sample data.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does FareShare scan receipts on the website?",
        answer:
          "Live scanning belongs in the FareShare mobile app at launch. This website explains the product and hosts the waitlist; marketing previews may use sample data.",
      },
      {
        question: "What if the scan is wrong?",
        answer:
          "Review and edit extracted items before sharing or paying. Scan quality can vary — correcting the receipt is part of the intended workflow.",
      },
    ],
    relatedLinks: [
      { href: "/features/itemized-splits", label: "Itemized splits" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/guides/split-grocery-receipt", label: "Split a grocery receipt" },
      { href: "/disclaimers", label: "Scanning disclaimers" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Receipt scanner", path: "/features/receipt-scanner" },
    ],
  },
  "itemized-splits": {
    slug: "itemized-splits",
    path: "/features/itemized-splits",
    eyebrow: "Feature",
    title: "Itemized bill splits, not just equal totals",
    description:
      "FareShare focuses on per-item assignment from receipts so people pay for what they shared — a clearer alternative to only splitting a total evenly.",
    keywords: [
      "itemized bill split",
      "split bill by item",
      "per item expense sharing",
      "FareShare itemized splits",
    ],
    definition:
      "Itemized splits in FareShare means assigning receipt line items to people (or sharing specific lines) so settlement reflects what each person actually owes.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "why",
        title: "Equal totals hide the truth",
        paragraphs: [
          "Equal splits are simple and often wrong. Itemized splits take a few more seconds and prevent the quiet resentment that builds when someone always subsidizes the group.",
        ],
      },
      {
        id: "how",
        title: "How assignment works",
        paragraphs: [
          "After a receipt is captured and reviewed, each line can be assigned to the right person or shared intentionally. That produces clearer balances than dividing one number by headcount.",
        ],
        bullets: [
          "Assign full items to one person",
          "Share specific lines across people",
          "Keep personal purchases personal",
          "Settle from assigned totals",
        ],
      },
      {
        id: "who",
        title: "Who it helps",
        paragraphs: [
          "Roommates, couples, friends at dinner, and trip groups all benefit when the bill matches reality. See our use-case pages for each scenario.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I still split equally in FareShare?",
        answer:
          "Equal splits can still make sense for small, even bills. FareShare’s focus is giving you itemized assignment when equal would be unfair — see our equal vs itemized guide.",
      },
    ],
    relatedLinks: [
      { href: "/guides/equal-vs-itemized-splits", label: "Equal vs itemized" },
      { href: "/for/roommates", label: "For roommates" },
      { href: "/for/friends-and-trips", label: "For friends & trips" },
      { href: "/features/household-sharing", label: "Household sharing" },
      { href: "/vs/splitwise", label: "FareShare vs Splitwise" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Itemized splits", path: "/features/itemized-splits" },
    ],
  },
  "household-sharing": {
    slug: "household-sharing",
    path: "/features/household-sharing",
    eyebrow: "Feature",
    title: "Household sharing for ongoing shared costs",
    description:
      "FareShare is built for households — roommates, couples, and families who need shared receipt context, assignments, and settlement over time.",
    keywords: [
      "household expense sharing",
      "shared household bills app",
      "family roommate expenses",
      "FareShare household",
    ],
    definition:
      "Household sharing in FareShare means keeping shared receipts, assignments, and settlement status visible for people who live together and split costs regularly.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "ongoing",
        title: "Households need ongoing context",
        paragraphs: [
          "One-off bill apps help at dinner. Households also need a place for recurring groceries, supplies, and shared runs — with the same people and the same expectations.",
        ],
      },
      {
        id: "features",
        title: "What household sharing aims to provide",
        paragraphs: [
          "Shared visibility of receipts, clear assignment, optional cost sharing patterns for home life, and a path to settle without reconstructing last week’s store run.",
        ],
        bullets: [
          "Shared receipts for people under one roof",
          "Itemized assignment for fairness",
          "Reminders and activity when it is time to settle",
          "History across many household bills",
        ],
      },
      {
        id: "launch",
        title: "Launch status",
        paragraphs: [
          "Household workflows are a primary FareShare focus. Exact plan details and household features will be communicated before release to waitlist members.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is household sharing only for roommates?",
        answer:
          "No. Couples and families who share ongoing household costs are also primary audiences. Roommates are simply a common, high-friction example.",
      },
    ],
    relatedLinks: [
      { href: "/for/roommates", label: "For roommates" },
      { href: "/for/couples", label: "For couples" },
      { href: "/guides/roommate-expense-system", label: "Roommate expense system" },
      { href: "/guides/split-utilities-household", label: "Split utilities" },
      { href: "/about", label: "About FareShare" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Household sharing", path: "/features/household-sharing" },
    ],
  },
};

export function getFeaturePage(slug: string): ClusterDocument | undefined {
  return FEATURE_PAGES[slug];
}

export function listFeatureSlugs(): string[] {
  return Object.keys(FEATURE_PAGES);
}
