import type { Metadata } from "next";

import { BackToFareShare } from "@/components/BackToFareShare";
import { GlowButton } from "@/components/ui/GlowButton";

const REASON_COPY: Record<string, string> = {
  missing: "This link is missing required information.",
  invalid: "This link is invalid or has already been used.",
  unavailable: "Waitlist actions are temporarily unavailable. Please try again later.",
};

export const metadata: Metadata = {
  title: "Waitlist link error — FareShare",
  robots: { index: false, follow: false },
};

export default async function WaitlistErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message = REASON_COPY[reason ?? ""] ?? REASON_COPY.invalid;

  return (
    <main className="min-h-screen bg-[#0a0a0b] px-6 py-16 text-white">
      <div className="mx-auto max-w-xl">
        <BackToFareShare className="mb-10" />

        <p className="text-xs font-medium uppercase tracking-widest text-red-400">
          Waitlist
        </p>
        <h1
          className="mt-3 text-3xl font-bold text-white md:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          We couldn&apos;t complete that request
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">{message}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <GlowButton href="/#cta">Join the waitlist</GlowButton>
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
