"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const friends = [
  { name: "Alex", color: "#34d399", angle: 0 },
  { name: "Jordan", color: "#60a5fa", angle: 72 },
  { name: "Sam", color: "#f472b6", angle: 144 },
  { name: "Taylor", color: "#fbbf24", angle: 216 },
  { name: "Casey", color: "#a78bfa", angle: 288 },
];

const splitModes = [
  { label: "Even Split", active: true },
  { label: "Custom Split", active: false, badge: "Coming Soon" },
  { label: "Assign to All", active: false },
];

export function AssignmentFlow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const connectionOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section id="assign" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-[#0c0c0e] to-[#0a0a0b]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            Fairness Made Beautiful
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Splitting shouldn&apos;t feel like{" "}
            <span className="text-zinc-500 line-through decoration-emerald-500/50">math</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            It should feel like <span className="text-emerald-400">clarity</span>.
          </p>
        </motion.div>

        {/* Orbital layout */}
        <div className="relative mx-auto flex h-[420px] max-w-lg items-center justify-center md:h-[500px] md:max-w-2xl">
          {/* Connection lines SVG */}
          <motion.svg
            style={{ opacity: connectionOpacity }}
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 400"
          >
            {friends.map((friend, i) => {
              const rad = ((friend.angle - 90) * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * 140;
              const y = 200 + Math.sin(rad) * 140;
              return (
                <motion.line
                  key={friend.name}
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke="#34d399"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  style={{ filter: "drop-shadow(0 0 4px rgba(52,211,153,0.5))" }}
                />
              );
            })}
          </motion.svg>

          {/* Center orb - the bill */}
          <motion.div
            style={{ scale: orbScale }}
            className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full md:h-36 md:w-36"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-80 pulse-glow" />
            <div className="absolute inset-2 rounded-full bg-[#0a0a0b]/80 backdrop-blur-sm" />
            <div className="relative z-10 text-center">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">Total Bill</div>
              <div className="text-xl font-bold text-emerald-400 md:text-2xl">$29.24</div>
            </div>
            <div className="absolute -inset-4 rounded-full bg-emerald-500/20 blur-xl" />
          </motion.div>

          {/* Orbiting avatars */}
          {friends.map((friend, i) => {
            const rad = ((friend.angle - 90) * Math.PI) / 180;
            const x = Math.cos(rad) * 140;
            const y = Math.sin(rad) * 140;
            return (
              <motion.div
                key={friend.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px - 28px)`,
                  top: `calc(50% + ${y}px - 28px)`,
                }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-sm font-bold shadow-lg md:h-16 md:w-16"
                    style={{
                      borderColor: friend.color,
                      backgroundColor: `${friend.color}15`,
                      color: friend.color,
                      boxShadow: `0 0 20px ${friend.color}30`,
                    }}
                  >
                    {friend.name[0]}
                  </div>
                  <span className="mt-1.5 text-[10px] text-zinc-400">{friend.name}</span>
                  <span className="text-[10px] font-medium text-emerald-400">$5.85</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Split mode pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {splitModes.map((mode) => (
            <div
              key={mode.label}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                mode.active
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 glow-emerald"
                  : "glass text-zinc-400"
              }`}
            >
              {mode.label}
              {mode.badge && (
                <span className="ml-2 rounded-full bg-zinc-700 px-2 py-0.5 text-[10px] text-zinc-400">
                  {mode.badge}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
