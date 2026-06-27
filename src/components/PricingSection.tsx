"use client";

import { motion } from "framer-motion";
import { Check, Home, Ticket, User } from "lucide-react";

import { COVERAGE_FOOTNOTE, COMING_SOON_COPY, PRICING_PLANS } from "@/lib/marketing-content";
import { SITE_DISCLAIMERS } from "@/lib/disclaimers";
import { MarketingDisclaimer } from "./MarketingDisclaimer";

const planIcons = {
  household: Home,
  individual: User,
  "one-time": Ticket,
} as const;

export function PricingSection() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
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
            Pricing that makes{" "}
            <span className="gradient-text">sense</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            {COMING_SOON_COPY.pricingIntro}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => {
            const Icon = planIcons[plan.id];
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl p-6 md:p-8 ${
                  plan.featured
                    ? "glass-strong border-emerald-500/30 shadow-xl shadow-emerald-500/10 md:-translate-y-2"
                    : "glass"
                }`}
              >
                {"badge" in plan && plan.badge ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-black">
                    {plan.badge}
                  </div>
                ) : null}

                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      plan.featured ? "bg-emerald-500/20" : "bg-white/5"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${plan.featured ? "text-emerald-400" : "text-zinc-400"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">{plan.name}</h3>
                    <p className="text-xs text-zinc-500">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-3xl font-bold text-zinc-100">{plan.price}</span>
                  <span className="text-sm text-zinc-500">{plan.period}</span>
                </div>
                {"priceNote" in plan && plan.priceNote ? (
                  <p className="mb-4 text-xs text-zinc-500">{plan.priceNote}</p>
                ) : (
                  <div className="mb-4 h-4" />
                )}

                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-2xl text-center text-sm text-zinc-500"
        >
          {COVERAGE_FOOTNOTE}
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
