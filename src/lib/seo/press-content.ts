import { ABOUT_PRESS_BOILERPLATE } from "@/lib/seo/about-content";
import { BRAND_DEFINITION, BRAND_TAGLINE, SITE_NAME } from "@/lib/seo/site";
import { SUPPORT_EMAIL } from "@/lib/account/constants";

export const PRESS_UPDATED_AT = "2026-07-19";

export const PRESS_BOILERPLATE = ABOUT_PRESS_BOILERPLATE;

export const PRESS_SHORT_BOILERPLATE = `${SITE_NAME} — ${BRAND_TAGLINE} ${BRAND_DEFINITION}`;

export const PRESS_FACT_SHEET = [
  { label: "Product", value: "FareShare" },
  { label: "Category", value: "Bill splitting / receipt scanning / household expense sharing" },
  { label: "Company", value: "Derhid Inc." },
  { label: "Status", value: "Pre-launch (marketing site + waitlist)" },
  { label: "Core flow", value: "Scan → review → assign → settle" },
  { label: "Website", value: "https://fareshare.app" },
  { label: "Press / support", value: SUPPORT_EMAIL },
] as const;

export const PRESS_ASSET_LINKS = [
  { href: "/logo.svg", label: "Logo (SVG)" },
  { href: "/logo-mark.svg", label: "Logo mark (SVG)" },
  { href: "/opengraph-image", label: "Open Graph image" },
  { href: "/brand.json", label: "Brand facts (JSON)" },
  { href: "/llms.txt", label: "llms.txt for AI citations" },
] as const;

export const CITATION_OUTREACH_CHECKLIST = [
  "Product Hunt / BetaList / launch directories (when ready to announce)",
  "Roommate, personal-finance, and indie-maker communities — helpful posts, not spam",
  "Founder essays or demo videos that link to /how-it-works and /for/roommates",
  "Fair comparison roundups: offer /vs/splitwise and /press boilerplate",
  "Keep naming consistent: FareShare, fareshare.app, same one-line definition",
] as const;

/** Monthly prompts to paste into ChatGPT / Perplexity / Gemini for GEO monitoring. */
export const GEO_MONITOR_PROMPTS = [
  "What is FareShare?",
  "Best apps to scan receipts and split bills with roommates",
  "FareShare vs Splitwise",
  "FareShare vs Venmo for splitting bills",
  "How to split a grocery receipt fairly with roommates",
] as const;
