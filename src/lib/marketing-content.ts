import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Camera,
  CreditCard,
  Home,
  ReceiptText,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

import type { ShowcaseScanResult } from "@/lib/showcase-scan/public-types";

export const SCAN_PIPELINE_STEPS = [
  {
    label: "Smart capture reads every line on your receipt",
    tone: "from-blue-500/20 to-blue-600/10",
  },
  {
    label: "Intelligent cleanup tidies item names and categories",
    tone: "from-purple-500/20 to-purple-600/10",
  },
  {
    label: "Quality checks flag duplicates and low-confidence reads",
    tone: "from-emerald-500/20 to-emerald-600/10",
  },
  {
    label: "You review, edit, and assign before anything is shared",
    tone: "from-amber-500/20 to-amber-600/10",
  },
] as const;

/** Static sample used in the scan section preview (no live upload). */
export const DEMO_SCAN_PREVIEW: ShowcaseScanResult = {
  merchant: "Trader Joe's",
  date: "June 12, 2026",
  total: 15.47,
  summary: {
    item_count: 3,
    items_to_review: 1,
    overall_review_status: "mixed",
    confidence_label: "Medium",
  },
  items: [
    {
      id: "demo-pasta",
      name: "Organic Pasta",
      category: "Groceries",
      price_after_tax: 2.99,
      review_status: "ready",
      confidence_label: "High",
    },
    {
      id: "demo-sauce",
      name: "Marinara Sauce",
      category: "Groceries",
      price_after_tax: 3.49,
      review_status: "ready",
      confidence_label: "High",
    },
    {
      id: "demo-wine",
      name: "Red Wine",
      category: "Beverages",
      price_after_tax: 8.99,
      review_status: "review",
      confidence_label: "Medium",
    },
  ],
  notices: ["1 item needs a quick review before saving."],
};

export const LAUNCH_PILLARS = [
  {
    id: "household",
    name: "Built for households",
    tagline: "Roommates, couples & families",
    description:
      "Keep shared groceries, household runs, and recurring expenses organized — everyone sees the same receipt.",
    featured: true,
    badge: "Shared living",
    features: [
      "Assign every line to the right person",
      "Shared reminders when it's time to settle",
      "Optional cost sharing across your home",
      "One place for in-household bills",
    ],
  },
  {
    id: "flexible",
    name: "Split anywhere",
    tagline: "Friends, trips & one-off dinners",
    description:
      "Use FareShare when you're out with people outside your household — no awkward math at the table.",
    featured: false,
    features: [
      "Invite anyone to a bill",
      "Scan once, split per person",
      "Track what you owe and what's owed",
      "Clear history for every receipt",
    ],
  },
  {
    id: "simple",
    name: "Pricing, when we're ready",
    tagline: "Fair splits without surprise fees",
    description:
      "We're finalizing subscription options before launch. The goal is simple: clarity for regular and occasional use.",
    featured: false,
    features: [
      "Plans announced before release",
      "Options for households and individuals",
      "No charges on this website",
      "Waitlist members hear first",
    ],
  },
] as const;

export const LAUNCH_FOOTNOTE =
  "Subscription details are not public yet. Join the waitlist to get launch updates and early access news — no purchase required today.";

export const COMING_SOON_COPY = {
  badge: "Coming soon",
  bannerLead: "FareShare is almost here.",
  bannerOffer:
    "Join the waitlist now — early signups get an exclusive launch perk when we go live.",
  bannerCta: "Claim your spot",
  heroLine: "The smarter way to split bills is on the way.",
  ctaSubtitle:
    "Be first in line when FareShare launches. Waitlist members receive something special at release — we'll share the details closer to launch day.",
  launchIntro:
    "FareShare is built around fair, per-item splits — whether you live together or only share the occasional bill. Plan details will be shared closer to launch.",
  waitlistButton: "Join the waitlist",
} as const;

export const FEATURE_HIGHLIGHTS: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Camera,
    title: "Scan or enter manually",
    description:
      "Capture receipts with your camera or add items by hand when you are splitting without a paper trail.",
  },
  {
    icon: ReceiptText,
    title: "My Receipts & I Need to Pay",
    description:
      "Manage bills you own and see every share assigned to you — grouped by receipt, ready to pay.",
  },
  {
    icon: UserPlus,
    title: "Friends & invites",
    description:
      "Add the people you split with, send requests, and keep your circle ready for the next bill.",
  },
  {
    icon: Users,
    title: "Household sharing",
    description:
      "Keep roommates and family on the same page — shared receipts, assignments, and optional cost sharing when everyone lives under one roof.",
  },
  {
    icon: CreditCard,
    title: "In-app payments",
    description:
      "Pay your share securely, track confirmations, and keep a clear record of what settled.",
  },
  {
    icon: Bell,
    title: "Activity & notifications",
    description:
      "Payment confirmations, assignment updates, and history — so nothing slips through the cracks.",
  },
  {
    icon: Home,
    title: "Your shared money",
    description:
      "See what you owe, what you are owed, and what still needs attention — all from Home.",
  },
  {
    icon: Sparkles,
    title: "Smart suggestions",
    description:
      "Helpful nudges for unassigned items, scan review, and bills that need a closer look.",
  },
];
