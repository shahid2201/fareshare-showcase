import type { Metadata } from "next";
import { BackToFareShare } from "@/components/BackToFareShare";
import { SafeLink } from "@/components/ui/SafeLink";
import { SUPPORT_EMAIL } from "@/lib/account/constants";
import {
  PRIVACY_PILLARS,
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_QUOTE,
} from "@/lib/account/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — FareShare",
  description:
    "How FareShare handles your data: minimal collection, careful receipt processing, and transparent results you control.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-full bg-[#080809] text-zinc-200">
      <header className="border-b border-white/5 px-6 py-4">
        <BackToFareShare />
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-xs uppercase tracking-widest text-emerald-400/80">
          Privacy Policy
        </p>
        <h1
          className="mt-3 font-display text-3xl font-bold text-zinc-100 md:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Your data, your rules
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Last updated {PRIVACY_POLICY_LAST_UPDATED}
        </p>

        <blockquote className="mt-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-6 text-base leading-relaxed text-zinc-300">
          {PRIVACY_POLICY_QUOTE}
        </blockquote>

        <div className="mt-10 space-y-8">
          {PRIVACY_PILLARS.map((pillar) => (
            <section key={pillar.title}>
              <h2 className="text-lg font-semibold text-zinc-200">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {pillar.description}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-zinc-200">Related policies</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            See also our{" "}
            <SafeLink href="/disclaimers" className="text-emerald-400 hover:text-emerald-300">
              Disclaimers
            </SafeLink>{" "}
            for marketing-site notices about pricing, previews, beta access, and payment
            limitations.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-zinc-200">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Questions about this policy? Email{" "}
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
