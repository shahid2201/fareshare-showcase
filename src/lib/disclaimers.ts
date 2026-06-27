/** Marketing-site disclaimers — aligned with app legal policies, vendor-neutral on the surface. */

export const DISCLAIMERS_LAST_UPDATED = "June 27, 2026";

export const SITE_DISCLAIMERS = {
  marketing:
    "This website is for marketing and product information only. Screens, amounts, and flows shown may be stylized or use sample data. The live mobile app is the authoritative product experience and may differ by platform, release, or account status.",
  financial:
    "FareShare is not a bank, credit union, money services business, financial adviser, tax adviser, debt collector, escrow agent, payment card issuer, or insurance provider. In-app payments are processed by licensed payment providers. FareShare records and facilitates payment-related status but does not guarantee that any user will receive funds.",
  professional:
    "FareShare does not provide tax, legal, accounting, financial, or reimbursement advice. Review all receipt data, splits, and payment records before relying on them for reimbursement, tax, or legal purposes.",
  ocr:
    "Scan and intelligence features can be incomplete, delayed, inaccurate, or unavailable. You are responsible for reviewing and correcting all extracted items, prices, categories, and totals before sharing or paying.",
  pricing:
    "Prices are shown in Canadian dollars (CAD) unless stated otherwise. Plans, fees, and coverage rules may change before or after launch. Applicable taxes may be added at checkout. Nothing here limits non-waivable consumer protection rights you may have under Canadian law.",
  beta:
    "Waitlist signup does not create a FareShare account or purchase a plan. Launch perks, if offered, are subject to change and will be communicated before release. We may email you about launch updates; see our Privacy Policy for how we handle your information.",
  uploadDemo:
    "The live scan on this page shows extracted line items for review. It does not save receipts, create splits, assign items, or charge your account.",
  previews:
    "Phone previews are illustrative mockups for design communication. Layout, copy, and features may change in production builds.",
  sampleData:
    "Figures and names shown in demos are fictional examples for illustration only.",
  asIs:
    "To the maximum extent permitted by law, FareShare marketing materials are provided “as is” and “as available” without warranties about accuracy, availability, or fitness for a particular purpose.",
} as const;

export const FOOTER_DISCLAIMER_BLOCKS: Array<{ title: string; body: string }> = [
  {
    title: "Not financial or professional advice",
    body: `${SITE_DISCLAIMERS.financial} ${SITE_DISCLAIMERS.professional}`,
  },
  {
    title: "Scanning & bill data",
    body: SITE_DISCLAIMERS.ocr,
  },
  {
    title: "Pricing & availability",
    body: SITE_DISCLAIMERS.pricing,
  },
  {
    title: "Marketing materials",
    body: `${SITE_DISCLAIMERS.marketing} ${SITE_DISCLAIMERS.asIs}`,
  },
];
