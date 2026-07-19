"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { BackToFareShare } from "@/components/BackToFareShare";
import { GlowButton } from "@/components/ui/GlowButton";

export default function WaitlistConfirmClient({ token }: { token: string }) {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasToken = useMemo(() => token.trim().length > 0, [token]);

  async function handleConfirm() {
    if (!hasToken) {
      router.push("/waitlist/error?reason=missing");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const status = res.status;
        if (status === 400) {
          router.push("/waitlist/error?reason=invalid");
          return;
        }
        router.push("/waitlist/error?reason=unavailable");
        return;
      }

      const payload = (await res.json()) as { state: string };

      if (payload.state === "already_confirmed") {
        router.push("/waitlist/confirmed?state=already");
      } else {
        router.push("/waitlist/confirmed");
      }
    } catch {
      setError("Unable to confirm right now. Please try again later.");
      router.push("/waitlist/error?reason=unavailable");
    } finally {
      setSubmitting(false);
    }
  }

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
          Confirm your email
        </h1>

        <p className="mt-4 text-base leading-7 text-zinc-400">
          Click confirm to finish joining the FareShare waitlist. We will send
          launch updates and early access news after confirmation.
        </p>

        {error ? (
          <p className="mt-4 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-8">
          <GlowButton
            onClick={handleConfirm}
            disabled={!hasToken || submitting}
            type="button"
            size="lg"
          >
            {submitting ? "Confirming..." : "Confirm my waitlist signup"}
          </GlowButton>
        </div>

        <div className="mt-6">
          <a
            href="/#cta"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-emerald-400/30 hover:text-white"
          >
            Join again
          </a>
        </div>
      </div>
    </main>
  );
}

