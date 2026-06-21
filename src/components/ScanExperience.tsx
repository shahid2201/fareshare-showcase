"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scan, Sparkles, Shield, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Scan,
    label: "Google Document AI reads your receipt",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Sparkles,
    label: "DeepSeek cleans item names & categories",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: Shield,
    label: "FareShare detects duplicates & confidence levels",
    color: "from-emerald-500/20 to-emerald-600/10",
  },
  {
    icon: CheckCircle2,
    label: "You review, edit, and assign with precision",
    color: "from-amber-500/20 to-amber-600/10",
  },
];

export function ScanExperience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const phoneX = useTransform(scrollYProgress, [0, 0.4], [200, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const receiptY = useTransform(scrollYProgress, [0.15, 0.35], [-100, 0]);
  const receiptRotate = useTransform(scrollYProgress, [0.15, 0.35], [-15, 0]);
  const scanProgress = useTransform(scrollYProgress, [0.35, 0.55], [0, 100]);
  const transformOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  return (
    <section
      id="scan"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-[#0d0d0f] to-[#0a0a0b]" />
      <div className="noise-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            Magic in Motion
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            From crumpled paper to{" "}
            <span className="gradient-text">structured data</span>
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              style={{ x: phoneX, opacity: phoneOpacity }}
              className="relative"
            >
              {/* Phone frame */}
              <div className="relative w-64 rounded-[2.5rem] border-4 border-zinc-800 bg-zinc-900 p-2 shadow-2xl shadow-black/60 md:w-72">
                <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-zinc-800" />
                <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0a0b] aspect-[9/19]">
                  {/* Crumpled receipt dropping in */}
                  <motion.div
                    style={{ y: receiptY, rotate: receiptRotate }}
                    className="absolute inset-x-4 top-16"
                  >
                    <div className="rounded-lg bg-zinc-100 p-3 shadow-lg" style={{ transform: "rotate(-3deg)" }}>
                      <div className="text-[8px] font-bold text-zinc-800 text-center">TRADER JOE&apos;S</div>
                      <div className="mt-2 space-y-0.5">
                        {["Pasta .... 2.99", "Sauce ... 3.49", "Wine .... 8.99"].map((l) => (
                          <div key={l} className="font-mono text-[7px] text-zinc-600">{l}</div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Scan beam */}
                  <motion.div
                    style={{ top: useTransform(scanProgress, (v) => `${v}%`) }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] z-10"
                  />

                  {/* Transformed items */}
                  <motion.div
                    style={{ opacity: transformOpacity }}
                    className="absolute inset-x-3 top-16 space-y-2"
                  >
                    {[
                      { name: "Organic Pasta", price: "$2.99", cat: "Groceries" },
                      { name: "Marinara Sauce", price: "$3.49", cat: "Groceries" },
                      { name: "Red Wine", price: "$8.99", cat: "Beverages" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center justify-between rounded-lg bg-zinc-800/80 p-2.5 border border-white/5"
                      >
                        <div>
                          <div className="text-[10px] font-medium text-zinc-200">{item.name}</div>
                          <div className="text-[8px] text-zinc-500">{item.cat}</div>
                        </div>
                        <div className="text-[10px] font-semibold text-emerald-400">{item.price}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
              <div className="absolute -inset-8 -z-10 rounded-full bg-emerald-500/5 blur-3xl" />
            </motion.div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group flex items-start gap-4"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} border border-white/5 transition-transform group-hover:scale-110`}
                >
                  <step.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="pt-2">
                  <p className="text-sm text-zinc-300 md:text-base">{step.label}</p>
                  <div className="mt-2 h-px w-0 bg-emerald-500/50 transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 border-l-2 border-emerald-500/40 pl-4 text-sm italic text-zinc-500"
            >
              No image storage. No clutter. Just clean, structured data.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
