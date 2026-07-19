import { MarketingContentPage } from "@/components/marketing/MarketingContentPage";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ClusterDocument } from "@/lib/seo/cluster-types";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildGuideHowToJsonLd,
} from "@/lib/seo/json-ld";

type ClusterDocumentPageProps = {
  document: ClusterDocument;
};

export function ClusterDocumentPage({ document }: ClusterDocumentPageProps) {
  const jsonLd = [
    buildBreadcrumbJsonLd(document.breadcrumb),
    ...(document.faqs?.length ? [buildFaqPageJsonLd(document.faqs)] : []),
    ...(document.howTo
      ? [buildGuideHowToJsonLd(document.howTo, document.path)]
      : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <MarketingContentPage
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.description}
        relatedLinks={document.relatedLinks}
      >
        <blockquote className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-6 text-sm leading-relaxed text-zinc-300 md:text-base">
          {document.definition}
        </blockquote>

        <div className="mt-10 space-y-10">
          {document.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2
                className="text-xl font-semibold text-zinc-100 md:text-2xl"
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
              {section.bullets ? (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-zinc-500"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {document.faqs?.length ? (
          <div className="mt-12 space-y-4">
            <h2
              className="text-xl font-semibold text-zinc-100"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              FAQ
            </h2>
            {document.faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 open:border-emerald-500/20"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-zinc-100 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span className="text-emerald-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        ) : null}
      </MarketingContentPage>
    </>
  );
}
