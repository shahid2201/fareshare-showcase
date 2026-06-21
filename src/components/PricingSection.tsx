"use client";

import { motion } from "framer-motion";
import { Home, User, Ticket, Check } from "lucide-react";
import { GlowButton } from "./ui/GlowButton";

const plans = [
  {
    icon: Home,
    name: "Household Plan",
    tagline: "Covers everyone",
    price: "$9.99",
    period: "/month",
    featured: true,
    badge: "Best Value",
    features: [
      "Unlimited scans",
      "Shared budgets",
      "Covers all household members",
      "Priority support",
      "Advanced analytics",
    ],
  },
  {
    icon: User,
    name: "Individual Plan",
    tagline: "For solo splitters",
    price: "$4.99",
    period: "/month",
    featured: false,
    features: [
      "Unlimited scans",
      "Unlimited splits",
      "Personal analytics",
      "Export history",
    ],
  },
  {
    icon: Ticket,
    name: "One-Time Access",
    tagline: "Perfect for occasional users",
    price: "$0.49",
    period: " per bill",
    featured: false,
    features: [
      "Single bill unlock",
      "Full feature access",
      "No subscription",
      "Pay only when you need it",
    ],
  },
];

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
            Fair for Everyone
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Pricing that makes{" "}
            <span className="gradient-text">sense</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
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
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-black">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    plan.featured ? "bg-emerald-500/20" : "bg-white/5"
                  }`}
                >
                  <plan.icon
                    className={`h-5 w-5 ${plan.featured ? "text-emerald-400" : "text-zinc-400"}`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-200">{plan.name}</h3>
                  <p className="text-xs text-zinc-500">{plan.tagline}</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-zinc-100">{plan.price}</span>
                <span className="text-sm text-zinc-500">{plan.period}</span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <GlowButton
                href="#cta"
                className={`w-full justify-center ${!plan.featured ? "opacity-80" : ""}`}
              >
                Get Started
              </GlowButton>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-zinc-500"
        >
          Participants without coverage pay{" "}
          <span className="font-medium text-emerald-400">$0.29</span> to unlock a bill.
        </motion.p>
      </div>
    </section>
  );
}
