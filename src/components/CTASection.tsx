"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { GlowButton } from "./ui/GlowButton";
import { MarketingDisclaimer } from "./MarketingDisclaimer";
import { SafeInput } from "./ui/SafeInput";
import { SafeLink } from "./ui/SafeLink";
import {
  TurnstileWidget,
  isTurnstileEnabled,
  type TurnstileWidgetHandle,
} from "@/components/TurnstileWidget";
import { useCsrfToken } from "@/components/CsrfProvider";
import { SITE_DISCLAIMERS } from "@/lib/disclaimers";
import { COMING_SOON_COPY } from "@/lib/marketing-content";
import { CSRF_HEADER_NAME } from "@/lib/csrf/constants";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const formStartedAtRef = useRef(Date.now());
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const turnstileRequired = isTurnstileEnabled();
  const { token, loading: csrfLoading, error: csrfError, refreshToken } = useCsrfToken();

  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, []);

  function clearTurnstile() {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  }

  const canSubmit =
    Boolean(token) &&
    !csrfLoading &&
    !submitting &&
    (!turnstileRequired || Boolean(turnstileToken));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (honeypot.trim()) {
      return;
    }

    if (!token) {
      setError(csrfError ?? "Secure form is still loading. Try again.");
      return;
    }

    if (turnstileRequired && !turnstileToken) {
      setError("Complete the verification check before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      let activeToken: string | null = token ?? (await refreshToken());

      if (!activeToken) {
        setError(csrfError ?? "Secure form is still loading. Try again.");
        return;
      }

      const submit = (csrfValue: string) =>
        fetch("/api/beta-signup", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            [CSRF_HEADER_NAME]: csrfValue,
          },
          body: JSON.stringify({
            email,
            company: honeypot,
            formStartedAt: formStartedAtRef.current,
            turnstileToken,
          }),
        });

      let response = await submit(activeToken);

      if (response.status === 403) {
        activeToken = await refreshToken();
        if (activeToken) {
          response = await submit(activeToken);
        }
      }

      const payload = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setError(payload.error ?? "Unable to submit your request.");
        clearTurnstile();
        return;
      }

      setSuccess(payload.message ?? "Check your email to confirm your spot on the waitlist.");
      setEmail("");
      clearTurnstile();
      formStartedAtRef.current = Date.now();
    } catch {
      setError("Unable to submit your request. Please try again.");
      clearTurnstile();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/8 blur-[120px]" />
      <div className="noise-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-6 inline-flex"
          >
            <Sparkles className="h-8 w-8 text-emerald-400" />
          </motion.div>

          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            {COMING_SOON_COPY.badge}
          </span>

          <h2
            className="font-display text-4xl font-bold md:text-6xl glow-emerald-text"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Be first when we{" "}
            <span className="gradient-text">launch</span>
          </h2>

          <p className="mt-6 text-lg text-zinc-400">
            {COMING_SOON_COPY.ctaSubtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="relative mx-auto mt-10 flex w-full max-w-sm flex-col gap-3"
            noValidate
          >
            <div className="flex flex-col gap-3">
              <SafeInput
                id="beta-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                maxInputLength={254}
                value={email}
                onValueChange={setEmail}
                placeholder="you@example.com"
                disabled={submitting || csrfLoading}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "beta-email-error" : undefined}
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 disabled:opacity-60"
              />
              {turnstileRequired ? (
                <TurnstileWidget
                  ref={turnstileRef}
                  onToken={setTurnstileToken}
                  onExpire={clearTurnstile}
                  onError={clearTurnstile}
                />
              ) : null}
              <div className="w-full [&>button]:block [&>button]:w-full">
                <GlowButton
                  type="submit"
                  size="lg"
                  className="w-full justify-center"
                  disabled={!canSubmit}
                >
                  {submitting ? "Submitting..." : COMING_SOON_COPY.waitlistButton}
                </GlowButton>
              </div>
            </div>

            <SafeInput
              tabIndex={-1}
              autoComplete="off"
              name="company"
              value={honeypot}
              onValueChange={setHoneypot}
              aria-hidden="true"
              className="pointer-events-none absolute h-0 w-0 opacity-0"
            />

            {error ? (
              <p id="beta-email-error" className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="text-sm text-emerald-400" role="status">
                {success}
              </p>
            ) : null}

            <MarketingDisclaimer id="beta-disclaimer" className="mt-4 text-left">
              {SITE_DISCLAIMERS.beta}{" "}
              <SafeLink href="/terms">Terms of Service</SafeLink>
              {" · "}
              <SafeLink href="/privacy">Privacy Policy</SafeLink>
              {" · "}
              <SafeLink href="/disclaimers">Disclaimers</SafeLink>
            </MarketingDisclaimer>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-sm text-zinc-600"
          >
            FareShare — because life is better when costs are clear.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
