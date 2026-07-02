"use client";

import { motion } from "framer-motion";
import { Check, Home, Sparkles, Users } from "lucide-react";

import { COMING_SOON_COPY, LAUNCH_FOOTNOTE, LAUNCH_PILLARS } from "@/lib/marketing-content";
import { SITE_DISCLAIMERS } from "@/lib/disclaimers";
import { GlowButton } from "./ui/GlowButton";
import { MarketingDisclaimer } from "./MarketingDisclaimer";

const pillarIcons = {
  household: Home,
  flexible: Users,
  simple: Sparkles,
} as const;

export function LaunchSection() {
  return (
    <section id="launch" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-[#0d0d0f] to-[#0a0a0b]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            {COMING_SOON_COPY.badge}
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Designed for{" "}
            <span className="gradient-text">fair splits</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            {COMING_SOON_COPY.launchIntro}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {LAUNCH_PILLARS.map((pillar, i) => {
            const Icon = pillarIcons[pillar.id];
            return (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl p-6 md:p-8 ${
                  pillar.featured
                    ? "glass-strong border-emerald-500/30 shadow-xl shadow-emerald-500/10 md:-translate-y-2"
                    : "glass"
                }`}
              >
                {"badge" in pillar && pillar.badge ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-black">
                    {pillar.badge}
                  </div>
                ) : null}

                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      pillar.featured ? "bg-emerald-500/20" : "bg-white/5"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${pillar.featured ? "text-emerald-400" : "text-zinc-400"}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">{pillar.name}</h3>
                    <p className="text-xs text-zinc-500">{pillar.tagline}</p>
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-zinc-400">{pillar.description}</p>

                <ul className="flex-1 space-y-3">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-400">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <GlowButton href="#cta" size="lg">
            {COMING_SOON_COPY.waitlistButton}
          </GlowButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-2xl text-center text-sm text-zinc-500"
        >
          {LAUNCH_FOOTNOTE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-2xl"
        >
          <MarketingDisclaimer className="text-center">{SITE_DISCLAIMERS.pricing}</MarketingDisclaimer>
        </motion.div>
      </div>
    </section>
  );
}
