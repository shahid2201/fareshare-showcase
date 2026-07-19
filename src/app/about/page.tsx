import { MarketingContentPage } from "@/components/marketing/MarketingContentPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ABOUT_BOILERPLATE,
  ABOUT_PRESS_BOILERPLATE,
  ABOUT_SECTIONS,
} from "@/lib/seo/about-content";
import {
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "FareShare is a bill-splitting app for scanning receipts, assigning shares, and settling household expenses. Learn who it’s for and our launch status.",
  path: "/about",
  keywords: [
    "FareShare",
    "about FareShare",
    "bill splitting app",
    "receipt scanner app",
    "household expense sharing",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          buildOrganizationJsonLd(),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <MarketingContentPage
        eyebrow="About"
        title="Built for shared costs that deserve clarity"
        description={ABOUT_BOILERPLATE}
        relatedLinks={[
          { href: "/how-it-works", label: "How it works" },
          { href: "/for/roommates", label: "For roommates" },
          { href: "/vs/splitwise", label: "vs Splitwise" },
          { href: "/press", label: "Press kit" },
          { href: "/security-privacy", label: "Security & privacy" },
          { href: "/faq", label: "FAQ" },
        ]}
      >
        <blockquote className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-6 text-sm leading-relaxed text-zinc-300 md:text-base">
          {ABOUT_PRESS_BOILERPLATE}
        </blockquote>

        <div className="mt-10 space-y-10">
          {ABOUT_SECTIONS.map((section) => (
            <section key={section.id} id={section.id}>
              <h2
                className="text-xl font-semibold text-zinc-100"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-zinc-400 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </MarketingContentPage>
    </>
  );
}
