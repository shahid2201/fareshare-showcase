"use client";

import { motion } from "framer-motion";

import { FEATURE_HIGHLIGHTS } from "@/lib/marketing-content";
import { SITE_DISCLAIMERS } from "@/lib/disclaimers";
import { MarketingDisclaimer } from "./MarketingDisclaimer";

export function FeaturesShowcase() {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            Built for real life
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Everything you need to{" "}
            <span className="gradient-text">split and settle</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 md:text-lg">
            From the first scan to the last payment — designed for friends, roommates, and
            households who want clarity without the spreadsheet.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_HIGHLIGHTS.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="glass group rounded-2xl p-5 transition-all hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform group-hover:scale-110">
                <feature.icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <MarketingDisclaimer className="mx-auto mt-10 max-w-3xl text-center">
          {SITE_DISCLAIMERS.financial}
        </MarketingDisclaimer>
      </div>
    </section>
  );
}
