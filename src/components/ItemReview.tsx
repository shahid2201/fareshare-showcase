"use client";

import { motion } from "framer-motion";
import { Merge, RotateCcw, Wand2, Sparkles } from "lucide-react";

const items = [
  { name: "Organic Milk", price: 4.99, confidence: 98, category: "Dairy", color: "bg-blue-500" },
  { name: "Sourdough Bread", price: 5.49, confidence: 95, category: "Bakery", color: "bg-amber-500" },
  { name: "Avocados (3)", price: 3.99, confidence: 92, category: "Produce", color: "bg-green-500" },
  { name: "Trail Mix", price: 6.99, confidence: 88, category: "Snacks", color: "bg-orange-500" },
  { name: "Granola Bars", price: 4.49, confidence: 91, category: "Snacks", color: "bg-orange-500" },
  { name: "Sparkling Water", price: 3.29, confidence: 97, category: "Beverages", color: "bg-cyan-500" },
];

const bulkActions = [
  { icon: RotateCcw, label: "Round" },
  { icon: Merge, label: "Merge" },
  { icon: Wand2, label: "Auto-Assign" },
];

export function ItemReview() {
  return (
    <section id="review" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-emerald-500/3 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            Control Without Complexity
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            AI helps.{" "}
            <span className="gradient-text">You stay in control.</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Item list */}
          <div className="space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -30, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass group flex items-center justify-between rounded-xl p-4 transition-shadow hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <div>
                    <div className="text-sm font-medium text-zinc-200">{item.name}</div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      item.confidence >= 95
                        ? "bg-emerald-500/20 text-emerald-400"
                        : item.confidence >= 90
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.confidence}%
                  </span>
                  <span className="text-sm font-semibold text-zinc-200">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Control panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-strong sticky top-28 h-fit rounded-2xl p-6"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Bulk Actions
            </h3>
            <div className="mb-6 flex gap-3">
              {bulkActions.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5"
                >
                  <action.icon className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs text-zinc-400">{action.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">Smart Suggestion</span>
              </div>
              <p className="text-sm text-zinc-300">
                Looks like snacks — group Trail Mix & Granola Bars?
              </p>
              <div className="mt-3 flex gap-2">
                <button type="button" className="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/30">
                  Group Items
                </button>
                <button type="button" className="rounded-lg px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300">
                  Dismiss
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Items", value: "6" },
                { label: "Total", value: "$29.24" },
                { label: "Avg Conf.", value: "93%" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-white/[0.02] p-3">
                  <div className="text-lg font-bold text-zinc-200">{stat.value}</div>
                  <div className="text-[10px] text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
