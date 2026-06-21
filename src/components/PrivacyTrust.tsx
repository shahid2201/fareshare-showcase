"use client";

import { motion } from "framer-motion";
import { Lock, Eye, Database, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Database,
    title: "No stored receipt images",
    description:
      "Receipts are processed in memory and discarded. We extract structured data — never hoard your photos.",
  },
  {
    icon: Eye,
    title: "Minimal data collection",
    description:
      "We only collect what's essential to split bills. No tracking, no selling, no surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent AI usage",
    description:
      "Every AI step is visible. Confidence scores, editable results, and full control over your data.",
  },
];

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
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass group rounded-2xl p-6 transition-all hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform group-hover:scale-110">
                <pillar.icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-200">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{pillar.description}</p>
            </motion.div>
          ))}
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
            FareShare is designed not to collect or store stored receipt image files,
            precise GPS location, SIN, biometrics, or raw bank credentials.
          </p>
          <footer className="mt-4 text-sm text-emerald-400/70">
            — FareShare Privacy Policy
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
