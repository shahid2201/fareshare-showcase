import { MarketingContentPage } from "@/components/marketing/MarketingContentPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_ITEMS } from "@/lib/seo/faq-content";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata = buildPageMetadata({
  title: "FAQ",
  description:
    "FAQ about FareShare: receipt scanning, itemized splits, roommates, waitlist signup, and how we differ from balance-only apps.",
  path: "/faq",
  keywords: [
    "FareShare FAQ",
    "bill splitting FAQ",
    "receipt scanner questions",
    "FareShare waitlist",
    "FareShare vs Splitwise",
  ],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          buildFaqPageJsonLd(FAQ_ITEMS),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <MarketingContentPage
        eyebrow="FAQ"
        title="Questions people ask about FareShare"
        description="Straight answers about what FareShare is, how itemized splits work, waitlist signup, and what we are — and are not."
        relatedLinks={[
          { href: "/how-it-works", label: "How it works" },
          { href: "/vs/splitwise", label: "vs Splitwise" },
          { href: "/for/roommates", label: "For roommates" },
          { href: "/guides/roommate-expense-system", label: "Roommate expense system" },
          { href: "/security-privacy", label: "Security & privacy" },
        ]}
      >
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 open:border-emerald-500/20 open:bg-emerald-500/[0.03]"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-zinc-100 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span className="mt-0.5 text-emerald-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </MarketingContentPage>
    </>
  );
}
