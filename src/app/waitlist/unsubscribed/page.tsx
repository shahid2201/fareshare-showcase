import type { Metadata } from "next";

import { BackToFareShare } from "@/components/BackToFareShare";
import { GlowButton } from "@/components/ui/GlowButton";

export const metadata: Metadata = {
  title: "Unsubscribed — FareShare waitlist",
  robots: { index: false, follow: false },
};

export default async function WaitlistUnsubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const { state } = await searchParams;
  const already = state === "already";

  return (
    <main className="min-h-screen bg-[#0a0a0b] px-6 py-16 text-white">
      <div className="mx-auto max-w-xl">
        <BackToFareShare className="mb-10" />

        <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">
          Waitlist
        </p>
        <h1
          className="mt-3 text-3xl font-bold text-white md:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {already ? "Already unsubscribed" : "You've been unsubscribed"}
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          {already
            ? "This email address is no longer on the FareShare waitlist."
            : "You won't receive further waitlist emails from FareShare. You can join again anytime from the homepage."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <GlowButton href="/#cta">Join again</GlowButton>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-emerald-400/30 hover:text-white"
          >
            Back to FareShare
          </a>
        </div>
      </div>
    </main>
  );
}
