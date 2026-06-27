"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock3,
  Wallet,
} from "lucide-react";

import { SITE_DISCLAIMERS } from "@/lib/disclaimers";
import { MarketingDisclaimer } from "./MarketingDisclaimer";

const sharedMoneyTiles = [
  {
    label: "You owe",
    value: "$12.30",
    icon: ArrowUpRight,
    positive: false,
    detail: "Shares waiting on you",
  },
  {
    label: "You're owed",
    value: "$36.80",
    icon: ArrowDownLeft,
    positive: true,
    detail: "Friends still owe you",
  },
  {
    label: "Needs attention",
    value: "3",
    icon: Bell,
    positive: false,
    detail: "Payments & updates",
  },
];

const insights = [
  {
    label: "What you spent",
    value: "$412.00",
    icon: Wallet,
    detail: "Bills you've shared",
  },
  {
    label: "Still open",
    value: "$48.10",
    icon: Clock3,
    detail: "Waiting to settle",
  },
  {
    label: "Settled",
    value: "$142.00",
    icon: CheckCircle2,
    detail: "Already paid back",
  },
];

export function DashboardSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section id="dashboard" className="section-padding relative overflow-hidden bg-[#0a0a0b] text-zinc-100">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            Home at a glance
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Your shared money,{" "}
            <span className="gradient-text">crystal clear</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            The Home screen shows what you owe, what you are owed, and what still needs a
            nudge — plus a breakdown of spent, open, and settled amounts.
          </p>
        </motion.div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {sharedMoneyTiles.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onHoverStart={() => setHoveredStat(i)}
              onHoverEnd={() => setHoveredStat(null)}
              className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </span>
                <motion.div
                  animate={hoveredStat === i ? { scale: 1.2 } : { scale: 1 }}
                  className={`rounded-lg p-1.5 ${
                    stat.positive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  <stat.icon className="h-4 w-4" />
                </motion.div>
              </div>
              <div className={`text-2xl font-bold ${stat.positive ? "text-emerald-400" : "text-zinc-100"}`}>
                {stat.value}
              </div>
              <p className="mt-1 text-xs text-zinc-500">{stat.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8 md:p-10"
        >
          <h3 className="mb-6 text-lg font-semibold text-zinc-200">Money breakdown</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {insights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
              >
                <div className="mb-3 flex items-center gap-2 text-emerald-400">
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {item.label}
                  </span>
                </div>
                <div className="text-xl font-bold text-zinc-100">{item.value}</div>
                <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <MarketingDisclaimer className="mx-auto mt-8 max-w-2xl text-center">
          {SITE_DISCLAIMERS.sampleData} {SITE_DISCLAIMERS.marketing}
        </MarketingDisclaimer>
      </div>
    </section>
  );
}
