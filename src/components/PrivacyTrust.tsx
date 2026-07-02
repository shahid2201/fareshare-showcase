"use client";

import { motion } from "framer-motion";
import { Lock, Eye, Database, ShieldCheck } from "lucide-react";
import { SafeLink } from "./ui/SafeLink";
import {
  PRIVACY_PILLARS,
  PRIVACY_POLICY_QUOTE,
} from "@/lib/account/privacy-content";

const pillarIcons = [Database, Eye, ShieldCheck] as const;

export function PrivacyTrust() {
  return (
    <section id="privacy" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[#080809]" />
      <div className="noise-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            Your Data, Your Rules
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Privacy isn&apos;t a feature.{" "}
            <span className="gradient-text">It&apos;s the foundation.</span>
          </h2>
        </motion.div>

        {/* Lock icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-center"
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <Lock className="h-10 w-10 text-emerald-400" />
            </div>
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl" />
          </motion.div>
        </motion.div>

        {/* Pillars */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {PRIVACY_PILLARS.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? ShieldCheck;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass group rounded-2xl p-6 transition-all hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-200">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-8 text-center md:p-10"
        >
          <div className="absolute -top-3 left-8 text-4xl text-emerald-500/30">&ldquo;</div>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            {PRIVACY_POLICY_QUOTE}
          </p>
          <footer className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-emerald-400/70">
            <SafeLink href="/terms" className="transition-colors hover:text-emerald-300">
              Terms of Service →
            </SafeLink>
            <SafeLink href="/privacy" className="transition-colors hover:text-emerald-300">
              Privacy Policy →
            </SafeLink>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
