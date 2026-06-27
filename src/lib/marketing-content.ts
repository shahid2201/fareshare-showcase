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

export const PRICING_PLANS = [
  {
    id: "household",
    name: "Household Plan",
    tagline: "For roommates, couples & families",
    price: "$6.99",
    period: " CAD / month",
    priceNote: "+ $0.99 per extra member (up to 10)",
    featured: true,
    badge: "Best for shared living",
    features: [
      "Unlimited scanning inside your household",
      "Unlimited splitting with household members",
      "Shared budgets and reminders",
      "Optional household cost sharing",
    ],
  },
  {
    id: "individual",
    name: "Individual Plan",
    tagline: "Split anywhere, anytime",
    price: "$3.49",
    period: " CAD / month",
    featured: false,
    features: [
      "Unlimited scanning with anyone",
      "Unlimited splits you create or join",
      "No one-time pass fees while active",
      "Works with friends outside your household",
    ],
  },
  {
    id: "one-time",
    name: "One-Time Access",
    tagline: "Pay only when you need it",
    price: "$0.50",
    period: " CAD per bill",
    featured: false,
    features: [
      "Create or unlock one bill",
      "Split with unlimited people on that bill",
      "View and settle assigned shares",
      "Expires after the bill is settled",
    ],
  },
] as const;

export const COVERAGE_FOOTNOTE =
  "Coverage keeps splits fair. Household plans cover in-household bills; Individual plans cover you everywhere; one-time access covers a single bill.";

export const COMING_SOON_COPY = {
  badge: "Coming soon",
  bannerLead: "FareShare is almost here.",
  bannerOffer:
    "Join the waitlist now — early signups get an exclusive launch perk when we go live.",
  bannerCta: "Claim your spot",
  heroLine: "The smarter way to split bills is on the way.",
  ctaSubtitle:
    "Be first in line when FareShare launches. Waitlist members receive something special at release — we'll share the details closer to launch day.",
  pricingIntro:
    "Planned pricing at launch — preview what's ahead while we're putting the finishing touches on the app.",
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
    title: "Household plans",
    description:
      "Cover roommates and family under one plan — with optional cost sharing when everyone is on the same team.",
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
