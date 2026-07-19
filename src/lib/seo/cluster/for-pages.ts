import type { ClusterDocument } from "@/lib/seo/cluster-types";

export const FOR_PAGES: Record<string, ClusterDocument> = {
  roommates: {
    slug: "roommates",
    path: "/for/roommates",
    eyebrow: "For roommates",
    title: "Split roommate expenses without the spreadsheet fight",
    metaTitle: "Roommate Expense Splitting",
    description:
      "Scan shared receipts, assign each item fairly, and track what roommates owe — built for household living.",
    keywords: [
      "roommate expense app",
      "split rent and groceries",
      "roommate bill splitting",
      "shared household expenses",
      "FareShare roommates",
    ],
    definition:
      "FareShare is a bill-splitting app for roommates that scans receipts, extracts line items, assigns shares, and tracks settlement so household costs stay clear.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "why",
        title: "Why roommate splits get messy",
        paragraphs: [
          "Groceries, household runs, cleaning supplies, and shared dinners rarely divide evenly. Someone buys more, someone skips a week, and the group chat becomes a ledger.",
          "Equal total splits hide who actually consumed what. Itemized assignment from a real receipt keeps the conversation about the bill — not about who is being unfair.",
        ],
      },
      {
        id: "how",
        title: "How FareShare helps roommates",
        paragraphs: [
          "Scan a shared receipt once, review the extracted lines, then assign each item to the right roommate. Everyone sees the same receipt context instead of reconstructing it from memory.",
        ],
        bullets: [
          "Per-item assignment for groceries and household runs",
          "Shared visibility for the people who live together",
          "Clear owed / owing status when it is time to settle",
          "History you can revisit when something looks off",
        ],
      },
      {
        id: "flow",
        title: "A simple roommate workflow",
        paragraphs: [
          "One roommate captures the receipt. The group reviews lines that need attention. Items get assigned. Settlement happens with a clear record — not a vague IOU.",
        ],
      },
      {
        id: "honest",
        title: "What to know before launch",
        paragraphs: [
          "FareShare is in pre-launch. Join the waitlist for launch updates. Waitlist signup does not create an account or purchase a plan. Scanning accuracy can vary — you remain responsible for reviewing extracted data before sharing or paying.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can FareShare split grocery receipts among roommates?",
        answer:
          "Yes. FareShare is designed for itemized splits from receipts so roommates can assign groceries and household items to the right people instead of only dividing a total equally.",
      },
      {
        question: "Do all roommates need the app?",
        answer:
          "Household sharing is a core FareShare use case. Exact invite and participation details will be confirmed at launch; waitlist updates will cover how shared households work.",
      },
    ],
    relatedLinks: [
      { href: "/guides/roommate-expense-system", label: "Roommate expense system guide" },
      { href: "/features/itemized-splits", label: "Itemized splits" },
      { href: "/for/couples", label: "FareShare for couples" },
      { href: "/how-it-works", label: "How it works" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "For roommates", path: "/for/roommates" },
    ],
  },
  couples: {
    slug: "couples",
    path: "/for/couples",
    eyebrow: "For couples",
    title: "Share household costs without awkward money talks",
    metaTitle: "Bill Splitting for Couples",
    description:
      "Scan receipts, assign shared and personal items, and keep everyday couple expenses clear without awkward money talks.",
    keywords: [
      "couples expense app",
      "split bills with partner",
      "shared household costs couples",
      "FareShare couples",
    ],
    definition:
      "FareShare helps couples split household and shared expenses by scanning receipts, reviewing line items, assigning shares, and tracking settlement.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "why",
        title: "Shared life, uneven receipts",
        paragraphs: [
          "Couples often share groceries, household goods, dinners out, and travel — but not every line on every receipt is shared 50/50.",
          "A clear itemized record reduces friction: you can share the pasta and sauce, keep personal items personal, and settle what is actually owed.",
        ],
      },
      {
        id: "how",
        title: "How FareShare fits couples",
        paragraphs: [
          "Capture the receipt, review the lines, assign shared vs personal items, and settle with a transparent history. Built for recurring household rhythms, not only one-off nights out.",
        ],
        bullets: [
          "Item-level clarity on shared purchases",
          "Useful for weekly groceries and household runs",
          "Works for dinners and trips outside the home too",
          "Settlement tracking so balances do not linger unspoken",
        ],
      },
      {
        id: "honest",
        title: "Pre-launch note",
        paragraphs: [
          "FareShare is preparing to launch. Join the waitlist for early access news. FareShare is not a bank or financial adviser; in-app payments are processed by licensed providers when available.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/for/roommates", label: "FareShare for roommates" },
      { href: "/guides/split-grocery-receipt", label: "How to split a grocery receipt" },
      { href: "/features/household-sharing", label: "Household sharing" },
      { href: "/faq", label: "FAQ" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "For couples", path: "/for/couples" },
    ],
  },
  "friends-and-trips": {
    slug: "friends-and-trips",
    path: "/for/friends-and-trips",
    eyebrow: "For friends & trips",
    title: "Split dinners and trip costs without awkward math",
    metaTitle: "Split Bills with Friends & on Trips",
    description:
      "Scan once, assign shares per person, and keep a clear record when splitting dinners and trip costs with friends.",
    keywords: [
      "split dinner bill app",
      "group trip expense splitter",
      "split restaurant bill with friends",
      "FareShare friends",
    ],
    definition:
      "FareShare helps friends and travel groups split shared bills by scanning receipts, assigning line items, and tracking settlement for dinners, outings, and trips.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "why",
        title: "One-off bills still need clarity",
        paragraphs: [
          "Equal splits are fine when everyone ordered the same — and unfair when they did not. Friends and trip groups need a fast way to go from receipt to fair shares.",
        ],
      },
      {
        id: "how",
        title: "Scan once, settle clearly",
        paragraphs: [
          "Capture the receipt at the table or later, review extracted items, assign lines to each person, and track settlement so nobody has to reconstruct the night from memory.",
        ],
        bullets: [
          "Restaurant and outing receipts",
          "Invite people outside your household",
          "Per-person assignment for shared and individual items",
          "History for every receipt you split",
        ],
      },
      {
        id: "trips",
        title: "Group trips",
        paragraphs: [
          "Trips create a pile of shared meals, groceries, and activities. FareShare is designed to keep those bills organized with the same scan → review → assign → settle flow.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/guides/split-restaurant-bill", label: "How to split a restaurant bill" },
      { href: "/features/receipt-scanner", label: "Receipt scanner" },
      { href: "/for/roommates", label: "For roommates" },
      { href: "/vs/splitwise", label: "FareShare vs Splitwise" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "For friends & trips", path: "/for/friends-and-trips" },
    ],
  },
};

export function getForPage(slug: string): ClusterDocument | undefined {
  return FOR_PAGES[slug];
}

export function listForSlugs(): string[] {
  return Object.keys(FOR_PAGES);
}
