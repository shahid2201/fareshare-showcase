import type { ClusterDocument } from "@/lib/seo/cluster-types";

export const GUIDE_PAGES: Record<string, ClusterDocument> = {
  "split-grocery-receipt": {
    slug: "split-grocery-receipt",
    path: "/guides/split-grocery-receipt",
    eyebrow: "Guide",
    title: "How to split a grocery receipt fairly",
    description:
      "A practical guide to splitting grocery receipts by item — so roommates and couples only pay for what they actually shared.",
    keywords: [
      "how to split a grocery receipt",
      "split groceries with roommates",
      "itemized grocery split",
      "fair grocery bill split",
    ],
    definition:
      "To split a grocery receipt fairly, capture the receipt, review every line, assign items to the right people, then settle only what each person owes — the workflow FareShare is built around.",
    updatedAt: "2026-07-19",
    howTo: {
      name: "How to split a grocery receipt fairly",
      description:
        "Capture a grocery receipt, review line items, assign shares, and settle what each person owes.",
      steps: [
        {
          name: "Capture the receipt",
          text: "Keep the paper or digital receipt. In FareShare, scan it with your camera or enter items manually if needed.",
        },
        {
          name: "Review every line",
          text: "Confirm item names, prices, and totals. Fix anything unclear before you assign shares.",
        },
        {
          name: "Assign items to people",
          text: "Mark shared staples vs personal items. Split shared lines intentionally instead of forcing an equal total.",
        },
        {
          name: "Settle what is owed",
          text: "Confirm each person’s total and settle with a clear record so the next grocery run starts clean.",
        },
      ],
    },
    sections: [
      {
        id: "problem",
        title: "Why equal grocery splits feel unfair",
        paragraphs: [
          "One person buys specialty snacks. Another skips dairy. Someone already paid for cleaning supplies last week. Splitting the total 50/50 or three ways ignores the actual cart.",
        ],
      },
      {
        id: "method",
        title: "The fair method: itemize first",
        paragraphs: [
          "Start from the receipt lines, not the final total. Shared household staples can be split; personal items stay with the buyer’s assignee. That is the difference between a spreadsheet argument and a clear bill.",
        ],
        bullets: [
          "Shared staples → split among the household",
          "Personal items → assigned to one person",
          "Review low-confidence or unclear lines before sharing",
          "Settle with totals everyone can see",
        ],
      },
      {
        id: "fareshare",
        title: "How FareShare supports this",
        paragraphs: [
          "FareShare is designed around scan → review → assign → settle. You capture the grocery receipt, correct extractions, assign line items, and track settlement. Always review extracted data before relying on it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should tax and bags be split equally?",
        answer:
          "Many households split tax proportionally with assigned items, or agree on a simple house rule. The important part is agreeing before settlement and keeping the receipt visible to everyone involved.",
      },
    ],
    relatedLinks: [
      { href: "/for/roommates", label: "FareShare for roommates" },
      { href: "/guides/roommate-expense-system", label: "Roommate expense system" },
      { href: "/features/receipt-scanner", label: "Receipt scanner" },
      { href: "/how-it-works", label: "How it works" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides/split-grocery-receipt" },
      { name: "Split a grocery receipt", path: "/guides/split-grocery-receipt" },
    ],
  },
  "split-restaurant-bill": {
    slug: "split-restaurant-bill",
    path: "/guides/split-restaurant-bill",
    eyebrow: "Guide",
    title: "How to split a restaurant bill fairly",
    description:
      "Learn a fair way to split restaurant bills by what people ordered — including tip and shared plates — without awkward table math.",
    keywords: [
      "how to split a restaurant bill",
      "split dinner bill fairly",
      "itemized restaurant split",
      "split tip with friends",
    ],
    definition:
      "A fair restaurant split starts with the itemized check: assign each dish and drink, decide how to handle shared plates and tip, then settle what each person owes.",
    updatedAt: "2026-07-19",
    howTo: {
      name: "How to split a restaurant bill fairly",
      description:
        "Use the itemized check to assign dishes, handle shared plates and tip, then settle per person.",
      steps: [
        {
          name: "Get the itemized check",
          text: "Ask for an itemized receipt so you can see each dish, drink, tax, and tip line.",
        },
        {
          name: "Assign dishes and drinks",
          text: "Each person takes what they ordered. Shared appetizers or bottles get split among those who shared them.",
        },
        {
          name: "Decide tip and tax rules",
          text: "Common approach: tip and tax follow the same proportions as assigned food and drink, unless the group agrees otherwise.",
        },
        {
          name: "Settle clearly",
          text: "Confirm totals and settle so nobody is left chasing transfers from a messy group chat.",
        },
      ],
    },
    sections: [
      {
        id: "why",
        title: "Equal splits punish careful orders",
        paragraphs: [
          "If one person ordered a salad and water while another ordered steak and cocktails, an equal split is not fairness — it is convenience for whoever ordered more.",
        ],
      },
      {
        id: "fareshare",
        title: "Using FareShare after dinner",
        paragraphs: [
          "Scan the receipt, review extracted items, assign lines to friends, and settle. FareShare is built for this flow whether the group lives together or only shared one meal.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/for/friends-and-trips", label: "For friends & trips" },
      { href: "/guides/split-grocery-receipt", label: "Split a grocery receipt" },
      { href: "/features/itemized-splits", label: "Itemized splits" },
      { href: "/vs/splitwise", label: "FareShare vs Splitwise" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Split a restaurant bill", path: "/guides/split-restaurant-bill" },
    ],
  },
  "roommate-expense-system": {
    slug: "roommate-expense-system",
    path: "/guides/roommate-expense-system",
    eyebrow: "Guide",
    title: "A simple roommate expense system that actually works",
    description:
      "Set up a roommate expense system with clear rules, receipt-based splits, and a settle cadence — so household money stays low-drama.",
    keywords: [
      "roommate expense system",
      "roommate chore and bill system",
      "shared household expense rules",
      "roommate money system",
    ],
    definition:
      "A working roommate expense system combines house rules, receipt-based itemized splits, and a regular settle cadence so shared costs stay transparent.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "rules",
        title: "Agree on house rules first",
        paragraphs: [
          "Decide what counts as shared (toilet paper, olive oil, cleaning supplies) versus personal. Write it down once. Ambiguity is what creates resentment later.",
        ],
        bullets: [
          "Shared staples list",
          "Personal items stay personal",
          "Who captures receipts after a store run",
          "When you settle (weekly or biweekly)",
        ],
      },
      {
        id: "receipts",
        title: "Use receipts as the source of truth",
        paragraphs: [
          "Memory is a bad ledger. Capture the receipt, assign lines, and keep history. That is the operating system FareShare is designed to support.",
        ],
      },
      {
        id: "cadence",
        title: "Settle on a cadence",
        paragraphs: [
          "Small balances that linger become big feelings. Pick a weekly or biweekly settle ritual so nobody is surprised.",
        ],
      },
      {
        id: "fareshare",
        title: "Where FareShare fits",
        paragraphs: [
          "FareShare focuses on scan → review → assign → settle for household receipts. It is not a bank and does not replace your house rules — it gives those rules a clear place to live.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/for/roommates", label: "FareShare for roommates" },
      { href: "/guides/split-grocery-receipt", label: "Split a grocery receipt" },
      { href: "/features/household-sharing", label: "Household sharing" },
      { href: "/security-privacy", label: "Security & privacy" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Roommate expense system", path: "/guides/roommate-expense-system" },
    ],
  },
  "equal-vs-itemized-splits": {
    slug: "equal-vs-itemized-splits",
    path: "/guides/equal-vs-itemized-splits",
    eyebrow: "Guide",
    title: "Equal split vs itemized split: which is fairer?",
    metaTitle: "Equal vs Itemized Bill Splits",
    description:
      "When an equal split is fine — and when itemized receipt splits are fairer for roommates, couples, and friend groups.",
    keywords: [
      "equal split vs itemized",
      "fair way to split a bill",
      "should we split equally",
      "itemized vs equal bill split",
    ],
    definition:
      "An equal split divides a total by headcount. An itemized split assigns receipt lines to people. Equal is faster; itemized is usually fairer when orders or grocery carts differ.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "equal",
        title: "When equal splits work",
        paragraphs: [
          "Equal splits are fine when everyone ordered roughly the same, shared everything, or explicitly agrees that convenience beats precision for a small bill.",
        ],
      },
      {
        id: "itemized",
        title: "When itemized splits are fairer",
        paragraphs: [
          "Use itemized splits for grocery runs, uneven dinners, trips with mixed personal purchases, or any household pattern where equal totals quietly punish someone every week.",
        ],
        bullets: [
          "Different order sizes at restaurants",
          "Mixed personal and shared groceries",
          "One person fronting household staples often",
          "Groups that care about long-term fairness",
        ],
      },
      {
        id: "fareshare",
        title: "FareShare’s default bias",
        paragraphs: [
          "FareShare is built around itemized receipt workflows — scan, review, assign, settle — because that matches how unfairness usually starts: with the lines on the receipt, not the final total alone.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is itemized always better?",
        answer:
          "No. For tiny equal outings, equal can be the kind choice. Itemized shines when amounts diverge or the same imbalance repeats.",
      },
    ],
    relatedLinks: [
      { href: "/features/itemized-splits", label: "Itemized splits" },
      { href: "/guides/split-restaurant-bill", label: "Split a restaurant bill" },
      { href: "/guides/split-grocery-receipt", label: "Split a grocery receipt" },
      { href: "/vs/splitwise", label: "vs Splitwise" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Equal vs itemized", path: "/guides/equal-vs-itemized-splits" },
    ],
  },
  "split-delivery-orders": {
    slug: "split-delivery-orders",
    path: "/guides/split-delivery-orders",
    eyebrow: "Guide",
    title: "How to split delivery and takeout orders fairly",
    metaTitle: "Split Delivery & Takeout Orders",
    description:
      "A simple method to split Uber Eats, DoorDash, and takeout orders by what people ordered — including fees and tip.",
    keywords: [
      "split Uber Eats bill",
      "split DoorDash with friends",
      "split delivery fees",
      "split takeout order fairly",
    ],
    definition:
      "To split a delivery order fairly, start from each person’s items, then decide how to share delivery fees, service fees, and tip before settling.",
    updatedAt: "2026-07-19",
    howTo: {
      name: "How to split a delivery order fairly",
      description:
        "Assign each person’s food, share fees intentionally, then settle.",
      steps: [
        {
          name: "List what each person ordered",
          text: "Use the order receipt or app summary so every dish and drink is attributed.",
        },
        {
          name: "Assign food and drink lines",
          text: "Personal items go to the person who ordered them. Shared platters get split among those who shared.",
        },
        {
          name: "Agree on fees and tip",
          text: "Common rule: delivery and service fees plus tip are split in the same proportions as food, or evenly if the group prefers simplicity.",
        },
        {
          name: "Settle once",
          text: "Confirm totals and settle so the person who placed the order is not chasing people for days.",
        },
      ],
    },
    sections: [
      {
        id: "fees",
        title: "Don’t forget fees",
        paragraphs: [
          "Delivery apps add fees that do not appear on a restaurant paper check the same way. Decide the fee rule before you assign food, or the person who checked out always loses.",
        ],
      },
      {
        id: "fareshare",
        title: "Using FareShare",
        paragraphs: [
          "If you have a receipt image or can enter lines manually, FareShare’s assign-then-settle flow is built for this. Review extracted data before anyone pays.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/for/friends-and-trips", label: "For friends & trips" },
      { href: "/guides/split-restaurant-bill", label: "Split a restaurant bill" },
      { href: "/features/itemized-splits", label: "Itemized splits" },
      { href: "/how-it-works", label: "How it works" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Split delivery orders", path: "/guides/split-delivery-orders" },
    ],
  },
  "split-utilities-household": {
    slug: "split-utilities-household",
    path: "/guides/split-utilities-household",
    eyebrow: "Guide",
    title: "How roommates can split utilities and household bills",
    metaTitle: "Split Utilities & Household Bills",
    description:
      "Practical ways roommates can split rent add-ons, utilities, and recurring household bills without confusion every month.",
    keywords: [
      "split utilities with roommates",
      "split household bills",
      "roommate utility split",
      "shared apartment expenses",
    ],
    definition:
      "Roommates usually split recurring utilities by agreement (equal or usage-based), and use receipt-based itemized splits for variable household purchases like groceries and supplies.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "recurring",
        title: "Recurring bills need a standing rule",
        paragraphs: [
          "Internet, electricity, and similar utilities work best with a written standing split — often equal shares — paid on a fixed cadence. Fighting the formula every month is the failure mode.",
        ],
      },
      {
        id: "variable",
        title: "Variable purchases need receipts",
        paragraphs: [
          "Groceries, cleaning goods, and one-off household runs change every week. Those are where itemized receipt splits prevent resentment better than equal totals.",
        ],
      },
      {
        id: "fareshare",
        title: "Where FareShare helps",
        paragraphs: [
          "FareShare is designed for the variable receipt side of household life. Pair it with a simple utility rule in your lease chat or house doc for the fixed bills.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/for/roommates", label: "For roommates" },
      { href: "/guides/roommate-expense-system", label: "Roommate expense system" },
      { href: "/features/household-sharing", label: "Household sharing" },
      { href: "/guides/split-grocery-receipt", label: "Split a grocery receipt" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Split utilities", path: "/guides/split-utilities-household" },
    ],
  },
  "vacation-expense-splitting": {
    slug: "vacation-expense-splitting",
    path: "/guides/vacation-expense-splitting",
    eyebrow: "Guide",
    title: "How to split vacation and group trip expenses",
    metaTitle: "Split Vacation & Trip Expenses",
    description:
      "A calm system for splitting group trip costs — shared dinners, groceries, activities, and who fronted what — before everyone flies home.",
    keywords: [
      "split vacation expenses",
      "group trip expense split",
      "travel group bill splitting",
      "how to split trip costs",
    ],
    definition:
      "For group trips, capture shared receipts as you go, assign personal vs shared lines, and settle on a cadence before travel ends so balances do not haunt the group chat afterward.",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "during",
        title: "Capture during the trip, not after",
        paragraphs: [
          "The worst trip splits happen at the airport. Photograph receipts the same day, note who shared what, and keep a running picture of balances.",
        ],
      },
      {
        id: "categories",
        title: "Separate shared and personal",
        paragraphs: [
          "Shared groceries and group dinners are not the same as someone’s souvenir or solo lunch. Itemized assignment keeps that distinction honest.",
        ],
        bullets: [
          "Shared lodging extras and group meals",
          "Personal purchases stay personal",
          "Activities only some people joined",
          "Mid-trip settle-ups for large fronts",
        ],
      },
      {
        id: "fareshare",
        title: "FareShare on trips",
        paragraphs: [
          "FareShare’s friends-and-trips workflow is aimed at scan → assign → settle for shared receipts. It is not a travel bank account; it is clarity for the bills you already paid.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/for/friends-and-trips", label: "For friends & trips" },
      { href: "/guides/split-restaurant-bill", label: "Split a restaurant bill" },
      { href: "/guides/split-delivery-orders", label: "Split delivery orders" },
      { href: "/vs/venmo", label: "FareShare vs Venmo" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Vacation expenses", path: "/guides/vacation-expense-splitting" },
    ],
  },
  "ask-to-be-paid-back": {
    slug: "ask-to-be-paid-back",
    path: "/guides/ask-to-be-paid-back",
    eyebrow: "Guide",
    title: "How to ask friends to pay you back (without the awkwardness)",
    metaTitle: "How to Ask to Be Paid Back",
    description:
      "Scripts and systems for requesting repayment after shared bills — clearer than vague group-chat reminders.",
    keywords: [
      "how to ask to be paid back",
      "remind friends they owe you",
      "split bill payment request",
      "polite way to collect money",
    ],
    definition:
      "The least awkward way to ask to be paid back is to share a clear itemized total, a due timing, and a single payment path — not a vague “you owe me something.”",
    updatedAt: "2026-07-19",
    sections: [
      {
        id: "clarity",
        title: "Clarity beats charm",
        paragraphs: [
          "People delay when the amount is fuzzy. Lead with the receipt context, the assigned total, and when you need it. Kind and specific beats cute and vague.",
        ],
      },
      {
        id: "script",
        title: "A simple script",
        paragraphs: [
          "“Here’s the receipt from Thursday — your share is $27.40 for the pasta and half the appetizer. Can you send it by Sunday?” That sentence does more than three soft pings.",
        ],
      },
      {
        id: "system",
        title: "Use a system so it is not personal",
        paragraphs: [
          "When splits live in a shared record, reminders feel like process — not pressure. FareShare is being built so assignment and settlement status are visible instead of buried in chat scrollback.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/guides/equal-vs-itemized-splits", label: "Equal vs itemized" },
      { href: "/for/friends-and-trips", label: "For friends & trips" },
      { href: "/features/itemized-splits", label: "Itemized splits" },
      { href: "/faq", label: "FAQ" },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Ask to be paid back", path: "/guides/ask-to-be-paid-back" },
    ],
  },
};

export function getGuidePage(slug: string): ClusterDocument | undefined {
  return GUIDE_PAGES[slug];
}

export function listGuideSlugs(): string[] {
  return Object.keys(GUIDE_PAGES);
}
