import { COMING_SOON_COPY } from "@/lib/marketing-content";
import { GlowButton } from "@/components/ui/GlowButton";
import { SafeLink } from "@/components/ui/SafeLink";

export function WaitlistBand() {
  return (
    <aside className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
        {COMING_SOON_COPY.badge}
      </p>
      <h2
        className="mt-3 font-display text-2xl font-bold text-zinc-100 md:text-3xl"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {COMING_SOON_COPY.bannerLead}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
        {COMING_SOON_COPY.ctaSubtitle}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <GlowButton href="/#cta" size="lg">
          {COMING_SOON_COPY.waitlistButton}
        </GlowButton>
        <SafeLink
          href="/faq"
          className="text-sm text-zinc-500 transition-colors hover:text-emerald-400"
        >
          Read the FAQ
        </SafeLink>
      </div>
    </aside>
  );
}
