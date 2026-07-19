import { MarketingContentPage } from "@/components/marketing/MarketingContentPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  HOW_IT_WORKS_INTRO,
  HOW_IT_WORKS_STEPS,
} from "@/lib/seo/how-it-works-content";
import {
  buildBreadcrumbJsonLd,
  buildHowToJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "How It Works",
  description: HOW_IT_WORKS_INTRO,
  path: "/how-it-works",
  keywords: [
    "how FareShare works",
    "scan receipt split bill",
    "itemized bill split",
    "assign receipt shares",
    "roommate expense app",
  ],
});

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={[
          buildHowToJsonLd(),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "How it works", path: "/how-it-works" },
          ]),
        ]}
      />
      <MarketingContentPage
        eyebrow="How it works"
        title="Scan. Review. Assign. Settle."
        description={HOW_IT_WORKS_INTRO}
        relatedLinks={[
          { href: "/about", label: "About FareShare" },
          { href: "/faq", label: "FAQ" },
          { href: "/#features", label: "Features" },
        ]}
      >
        <ol className="space-y-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <li key={step.id}>
              <section
                id={step.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400/80">
                  {step.summary}
                </p>
                <h2
                  className="mt-3 text-2xl font-semibold text-zinc-100"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {step.body}
                </p>
                <ul className="mt-5 space-y-2">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-zinc-500"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </li>
          ))}
        </ol>
      </MarketingContentPage>
    </>
  );
}
