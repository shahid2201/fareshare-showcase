import { BRAND_DEFINITION } from "@/lib/seo/site";

export const ABOUT_BOILERPLATE = BRAND_DEFINITION;

export const ABOUT_SECTIONS = [
  {
    id: "what",
    title: "What we are building",
    paragraphs: [
      BRAND_DEFINITION,
      "Shared costs should not require a spreadsheet, a group chat argument, or awkward mental math at the table. FareShare turns a receipt into a clear, assignable bill — then helps everyone settle up.",
    ],
  },
  {
    id: "who",
    title: "Who it is for",
    paragraphs: [
      "Roommates splitting groceries. Couples sharing household runs. Friends dividing a dinner. Travel groups catching up after a trip. If you share costs with people you trust, FareShare is built for that everyday friction.",
    ],
  },
  {
    id: "principles",
    title: "Product principles",
    paragraphs: [
      "Clarity over cleverness: every line should be reviewable before it is shared.",
      "Households first: people who live together need ongoing shared context, not one-off IOUs alone.",
      "Honest marketing: this website explains the product and collects a waitlist — the live mobile app will be the authoritative experience at launch.",
    ],
  },
  {
    id: "status",
    title: "Launch status",
    paragraphs: [
      "FareShare is in the pre-launch phase. Join the waitlist to get launch updates and early access news. Waitlist signup does not create an account or purchase a plan. Subscription details will be announced before release.",
    ],
  },
] as const;

export const ABOUT_PRESS_BOILERPLATE = `${BRAND_DEFINITION} FareShare is currently in pre-launch; learn more at https://fareshare.app.`;
