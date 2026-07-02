import { BackToFareShare } from "@/components/BackToFareShare";
import { SafeLink } from "@/components/ui/SafeLink";
import { SUPPORT_EMAIL } from "@/lib/account/constants";
import type { ShowcaseLegalDocument } from "@/lib/legal/showcase-documents";

type LegalDocumentPageProps = {
  document: ShowcaseLegalDocument;
  relatedLinks?: Array<{ href: string; label: string }>;
};

export function LegalDocumentPage({ document, relatedLinks = [] }: LegalDocumentPageProps) {
  const defaultRelated =
    document.slug === "terms"
      ? [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/disclaimers", label: "Disclaimers" },
        ]
      : [
          { href: "/terms", label: "Terms of Service" },
          { href: "/disclaimers", label: "Disclaimers" },
        ];

  const links = relatedLinks.length > 0 ? relatedLinks : defaultRelated;

  return (
    <div className="min-h-full bg-[#080809] text-zinc-200">
      <header className="border-b border-white/5 px-6 py-4">
        <BackToFareShare />
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-xs uppercase tracking-widest text-emerald-400/80">
          {document.slug === "terms" ? "Terms of Service" : "Privacy Policy"}
        </p>
        <h1
          className="mt-3 font-display text-3xl font-bold text-zinc-100 md:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {document.title}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Effective {document.effectiveDate} · Version {document.policyVersion}
        </p>

        <blockquote className="mt-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-6 text-sm leading-relaxed text-zinc-300">
          {document.summary}
        </blockquote>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Scope</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{document.scopeNote}</p>
        </div>

        <div className="mt-10 space-y-8">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-zinc-200">{section.title}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-zinc-500">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-zinc-500">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-zinc-200">Related policies</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            {links.map((link, index) => (
              <span key={link.href}>
                {index > 0 ? " · " : null}
                <SafeLink href={link.href} className="text-emerald-400 hover:text-emerald-300">
                  {link.label}
                </SafeLink>
              </span>
            ))}
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-zinc-200">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Questions? Email{" "}
            <SafeLink
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-emerald-400 transition-colors hover:text-emerald-300"
            >
              {SUPPORT_EMAIL}
            </SafeLink>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
