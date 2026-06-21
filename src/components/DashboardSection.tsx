"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Coffee,
  ShoppingCart,
  Plane,
  PartyPopper,
  Receipt,
} from "lucide-react";

const stats = [
  {
    label: "Net Balance",
    value: "+$24.50",
    icon: TrendingUp,
    positive: true,
    detail: "You're ahead this month",
  },
  {
    label: "You Owe",
    value: "$12.30",
    icon: ArrowUpRight,
    positive: false,
    detail: "2 pending payments",
  },
  {
    label: "You Are Owed",
    value: "$36.80",
    icon: ArrowDownLeft,
    positive: true,
    detail: "From 3 friends",
  },
  {
    label: "Outstanding",
    value: "$48.10",
    icon: Clock,
    positive: false,
    detail: "4 open bills",
  },
  {
    label: "Reimbursed",
    value: "$142.00",
    icon: CheckCircle,
    positive: true,
    detail: "This month",
  },
];

const timeline = [
  { label: "Coffee with friends", icon: Coffee, amount: "$18.40", date: "Jun 18" },
  { label: "Groceries with roommates", icon: ShoppingCart, amount: "$67.22", date: "Jun 15" },
  { label: "Weekend trip", icon: Plane, amount: "$234.00", date: "Jun 10" },
  { label: "Birthday dinner", icon: PartyPopper, amount: "$89.50", date: "Jun 5" },
  { label: "Utility bills", icon: Receipt, amount: "$156.00", date: "Jun 1" },
];

export function DashboardSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <section id="dashboard" className="section-padding relative overflow-hidden bg-[#f8f9fa] text-zinc-900">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-600/20 bg-emerald-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-700">
            Your Financial Story, Simplified
          </span>
          <h2
            className="font-display text-3xl font-bold text-zinc-900 md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Every shared moment,{" "}
            <span className="text-emerald-600">crystal clear</span>
          </h2>
        </motion.div>

        {/* Stats cards */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onHoverStart={() => setHoveredStat(i)}
              onHoverEnd={() => setHoveredStat(null)}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </span>
                <motion.div
                  animate={
                    hoveredStat === i
                      ? { scale: 1.2, fill: "currentColor" }
                      : { scale: 1 }
                  }
                  className={`rounded-lg p-1.5 ${
                    stat.positive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  <stat.icon className="h-4 w-4" />
                </motion.div>
              </div>
              <motion.div
                animate={hoveredStat === i ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
                className={`text-2xl font-bold ${
                  stat.positive ? "text-emerald-600" : "text-zinc-800"
                }`}
              >
                {stat.value}
              </motion.div>
              <p className="mt-1 text-xs text-zinc-400">{stat.detail}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm md:p-12"
        >
          <h3 className="mb-8 text-lg font-semibold text-zinc-800">
            Your Shared Life Timeline
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-300 to-transparent md:left-1/2 md:-translate-x-px" />

            <div className="space-y-8">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.label}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  onMouseEnter={() => setHoveredDot(i)}
                  onMouseLeave={() => setHoveredDot(null)}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                    {i % 2 === 0 && (
                      <motion.div
                        animate={hoveredDot === i ? { scale: 1.02, x: -4 } : {}}
                        className="inline-block rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-left shadow-sm"
                      >
                        <div className="text-sm font-medium text-zinc-800">{event.label}</div>
                        <div className="mt-1 text-xs text-zinc-400">{event.date}</div>
                        <div className="mt-1 text-sm font-semibold text-emerald-600">{event.amount}</div>
                      </motion.div>
                    )}
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center">
                    <motion.div
                      animate={
                        hoveredDot === i
                          ? { scale: 1.3, boxShadow: "0 0 20px rgba(16,185,129,0.4)" }
                          : { scale: 1 }
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-500 bg-white shadow-md"
                    >
                      <event.icon className="h-4 w-4 text-emerald-600" />
                    </motion.div>
                  </div>

                  <div className={`flex-1 md:hidden ${i % 2 !== 0 ? "" : "hidden"}`}>
                    <motion.div
                      animate={hoveredDot === i ? { scale: 1.02 } : {}}
                      className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 shadow-sm"
                    >
                      <div className="text-sm font-medium text-zinc-800">{event.label}</div>
                      <div className="mt-1 text-xs text-zinc-400">{event.date}</div>
                      <div className="mt-1 text-sm font-semibold text-emerald-600">{event.amount}</div>
                    </motion.div>
                  </div>
                  <div className={`hidden flex-1 md:block ${i % 2 !== 0 ? "text-left" : "text-right"}`}>
                    {i % 2 !== 0 && (
                      <motion.div
                        animate={hoveredDot === i ? { scale: 1.02, x: 4 } : {}}
                        className="inline-block rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-left shadow-sm"
                      >
                        <div className="text-sm font-medium text-zinc-800">{event.label}</div>
                        <div className="mt-1 text-xs text-zinc-400">{event.date}</div>
                        <div className="mt-1 text-sm font-semibold text-emerald-600">{event.amount}</div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
