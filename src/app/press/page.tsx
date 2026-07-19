import { MarketingContentPage } from "@/components/marketing/MarketingContentPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SafeLink } from "@/components/ui/SafeLink";
import {
  CITATION_OUTREACH_CHECKLIST,
  GEO_MONITOR_PROMPTS,
  PRESS_ASSET_LINKS,
  PRESS_BOILERPLATE,
  PRESS_FACT_SHEET,
  PRESS_SHORT_BOILERPLATE,
  PRESS_UPDATED_AT,
} from "@/lib/seo/press-content";
import { buildBreadcrumbJsonLd, buildOrganizationJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Press & Media Kit",
  description:
    "FareShare press boilerplate, brand facts, downloadable assets, and citation links for journalists, creators, and directories.",
  path: "/press",
  keywords: [
    "FareShare press kit",
    "FareShare media kit",
    "FareShare boilerplate",
    "FareShare brand assets",
  ],
});

export default function PressPage() {
  return (
    <>
      <JsonLd
        data={[
          buildOrganizationJsonLd(),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Press", path: "/press" },
          ]),
        ]}
      />
      <MarketingContentPage
        eyebrow="Press"
        title="Press & media kit"
        description="Approved boilerplate, facts, and assets for accurate coverage. Updated when public product facts change."
        relatedLinks={[
          { href: "/about", label: "About" },
          { href: "/vs/splitwise", label: "vs Splitwise" },
          { href: "/how-it-works", label: "How it works" },
          { href: "/security-privacy", label: "Security & privacy" },
        ]}
      >
        <p className="text-sm text-zinc-500">Last updated {PRESS_UPDATED_AT}</p>

        <section className="mt-8">
          <h2
            className="text-xl font-semibold text-zinc-100"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Boilerplate
          </h2>
          <blockquote className="mt-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-6 text-sm leading-relaxed text-zinc-300 md:text-base">
            {PRESS_BOILERPLATE}
          </blockquote>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">{PRESS_SHORT_BOILERPLATE}</p>
        </section>

        <section className="mt-12">
          <h2
            className="text-xl font-semibold text-zinc-100"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Fact sheet
          </h2>
          <dl className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            {PRESS_FACT_SHEET.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {row.label}
                </dt>
                <dd className="text-sm text-zinc-300">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2
            className="text-xl font-semibold text-zinc-100"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Assets
          </h2>
          <ul className="mt-4 space-y-2">
            {PRESS_ASSET_LINKS.map((asset) => (
              <li key={asset.href}>
                <SafeLink
                  href={asset.href}
                  className="text-sm text-emerald-400/90 hover:text-emerald-300"
                >
                  {asset.label}
                </SafeLink>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2
            className="text-xl font-semibold text-zinc-100"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Citation & outreach checklist
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Off-site mentions move GEO more than meta tags. Use this list when you are ready to
            announce or pitch.
          </p>
          <ul className="mt-4 space-y-2">
            {CITATION_OUTREACH_CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-zinc-500"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2
            className="text-xl font-semibold text-zinc-100"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Monthly GEO monitor prompts
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Paste these into ChatGPT, Perplexity, and Gemini monthly. If answers are wrong, update
            the matching page and `/llms.txt`, then resubmit those URLs.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-zinc-500">
            {GEO_MONITOR_PROMPTS.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ol>
        </section>
      </MarketingContentPage>
    </>
  );
}
