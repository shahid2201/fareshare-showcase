import { BackToFareShare } from "@/components/BackToFareShare";
import { SafeLink } from "@/components/ui/SafeLink";
import {
  DISCLAIMERS_LAST_UPDATED,
  FOOTER_DISCLAIMER_BLOCKS,
  SITE_DISCLAIMERS,
} from "@/lib/disclaimers";
import { SUPPORT_EMAIL } from "@/lib/account/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Disclaimers",
  description:
    "Important disclaimers for FareShare marketing materials, pricing, scanning, payments, and private beta access.",
  path: "/disclaimers",
});

export default function DisclaimersPage() {
  return (
    <div className="min-h-full bg-[#080809] text-zinc-200">
      <header className="border-b border-white/5 px-6 py-4">
        <BackToFareShare />
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-xs uppercase tracking-widest text-emerald-400/80">Disclaimers</p>
        <h1
          className="mt-3 font-display text-3xl font-bold text-zinc-100 md:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Important information
        </h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated {DISCLAIMERS_LAST_UPDATED}</p>
        <p className="mt-6 text-sm leading-relaxed text-zinc-400">
          These disclaimers apply to the FareShare marketing website, product previews, and
          waitlist forms. They should be read together with our{" "}
          <SafeLink href="/terms" className="text-emerald-400 hover:text-emerald-300">
            Terms of Service
          </SafeLink>{" "}
          and{" "}
          <SafeLink href="/privacy" className="text-emerald-400 hover:text-emerald-300">
            Privacy Policy
          </SafeLink>
          . Use of the mobile app is governed by separate in-app legal terms.
        </p>

        <div className="mt-10 space-y-8">
          {FOOTER_DISCLAIMER_BLOCKS.map((block) => (
            <section key={block.title}>
              <h2 className="text-lg font-semibold text-zinc-200">{block.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{block.body}</p>
            </section>
          ))}

          <section>
            <h2 className="text-lg font-semibold text-zinc-200">Waitlist signup</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{SITE_DISCLAIMERS.beta}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200">Website upload demo</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{SITE_DISCLAIMERS.uploadDemo}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200">Product previews</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{SITE_DISCLAIMERS.previews}</p>
          </section>
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-zinc-200">Questions</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Contact{" "}
            <SafeLink
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-emerald-400 transition-colors hover:text-emerald-300"
            >
              {SUPPORT_EMAIL}
            </SafeLink>{" "}
            for clarification about these disclaimers, Terms of Service, or Privacy Policy.
          </p>
        </section>
      </main>
    </div>
  );
}
