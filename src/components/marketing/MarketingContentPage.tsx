import type { ReactNode } from "react";

import { BackToFareShare } from "@/components/BackToFareShare";
import { Footer } from "@/components/Footer";
import { WaitlistBand } from "@/components/marketing/WaitlistBand";
import { SafeLink } from "@/components/ui/SafeLink";

type MarketingContentPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  relatedLinks?: Array<{ href: string; label: string }>;
};

export function MarketingContentPage({
  eyebrow,
  title,
  description,
  children,
  relatedLinks = [],
}: MarketingContentPageProps) {
  return (
    <div className="relative min-h-full bg-[#080809] text-zinc-200">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_55%)]" />

      <header className="relative border-b border-white/5 px-6 py-4">
        <BackToFareShare />
      </header>

      <main className="relative mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="text-xs uppercase tracking-widest text-emerald-400/80">{eyebrow}</p>
        <h1
          className="mt-3 font-display text-3xl font-bold text-zinc-100 md:text-5xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          {description}
        </p>

        <div className="mt-12">{children}</div>

        {relatedLinks.length > 0 ? (
          <nav
            aria-label="Related pages"
            className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Related
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <SafeLink
                    href={link.href}
                    className="text-emerald-400/90 transition-colors hover:text-emerald-300"
                  >
                    {link.label}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="mt-10">
          <WaitlistBand />
        </div>
      </main>

      <Footer />
    </div>
  );
}
