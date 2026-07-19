import type { ClusterDocument } from "@/lib/seo/cluster-types";

export const SECURITY_PRIVACY_PAGE: ClusterDocument = {
  slug: "security-privacy",
  path: "/security-privacy",
  eyebrow: "Trust",
  title: "Security & privacy at FareShare",
  description:
    "How FareShare approaches privacy, receipt data, and payments on the marketing site and upcoming product — plus links to full legal policies.",
  keywords: [
    "FareShare privacy",
    "FareShare security",
    "receipt data privacy",
    "bill splitting app privacy",
  ],
  definition:
    "FareShare treats receipt and expense data as sensitive household information. This marketing site collects waitlist data under published policies; the live app will be the authoritative product experience at launch.",
  updatedAt: "2026-07-19",
  sections: [
    {
      id: "stance",
      title: "Our stance",
      paragraphs: [
        "Shared money data is personal. FareShare is building for clarity in splits — not for turning household receipts into unexplained black boxes.",
        "On this website, we collect waitlist-related information as described in our Privacy Policy. Optional demonstrations, if enabled, are scoped and disclosed separately.",
      ],
    },
    {
      id: "receipts",
      title: "Receipts & extracted data",
      paragraphs: [
        "Scan and intelligence features can be incomplete or inaccurate. You are responsible for reviewing extracted items before sharing or paying. Marketing mockups may use sample data.",
      ],
    },
    {
      id: "payments",
      title: "Payments",
      paragraphs: [
        "FareShare is not a bank, credit union, or money services business. In-app payments are processed by licensed payment providers. FareShare records payment-related status but does not guarantee that any user will receive funds.",
      ],
    },
    {
      id: "policies",
      title: "Read the full policies",
      paragraphs: [
        "For binding terms, use the legal pages — not this summary. This page is a trust overview for humans and search engines.",
      ],
      bullets: [
        "Privacy Policy — waitlist and website data practices",
        "Terms of Service — rules for using this website",
        "Disclaimers — scanning, pricing, and marketing limitations",
      ],
    },
  ],
  relatedLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/disclaimers", label: "Disclaimers" },
    { href: "/about", label: "About FareShare" },
  ],
  breadcrumb: [
    { name: "Home", path: "/" },
    { name: "Security & privacy", path: "/security-privacy" },
  ],
};
