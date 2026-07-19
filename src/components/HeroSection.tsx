"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { GlowButton } from "./ui/GlowButton";
import { GlassButton } from "./ui/GlassButton";
import { COMING_SOON_COPY } from "@/lib/marketing-content";

const itemCards = [
  { name: "Organic Milk", price: "$4.99", angle: -45, dist: 180 },
  { name: "Sourdough", price: "$5.49", angle: -15, dist: 200 },
  { name: "Avocados (3)", price: "$3.99", angle: 20, dist: 190 },
  { name: "Coffee Beans", price: "$12.99", angle: 55, dist: 170 },
  { name: "Greek Yogurt", price: "$6.29", angle: 85, dist: 185 },
  { name: "Bananas", price: "$2.49", angle: 120, dist: 195 },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [phase, setPhase] = useState<"scan" | "reveal" | "shatter">("scan");
  const [headlineVisible, setHeadlineVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeadlineVisible(true), 1200);
    const t2 = setTimeout(() => setPhase("reveal"), 2800);
    const t3 = setTimeout(() => setPhase("shatter"), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 30);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 30);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Breathing background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="breathe-bg absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="breathe-bg absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-600/3 blur-[100px]" style={{ animationDelay: "-4s" }} />
        <div className="noise-overlay absolute inset-0" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <motion.div style={{ opacity, scale }} className="relative z-10 flex flex-col items-center px-6 pt-32 text-center md:pt-36">
        {/* Scan line reveal area */}
        <div className="relative mb-28 min-h-[320px] w-full max-w-3xl pb-16">
          {/* Scanning laser line */}
          {phase === "scan" && (
            <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden rounded-2xl">
              <div className="scan-line absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#34d399,0_0_60px_#10b981]" />
              <div className="scan-line absolute left-0 right-0 h-8 bg-gradient-to-b from-emerald-400/20 to-transparent" style={{ animationDelay: "0.05s" }} />
            </div>
          )}

          {/* Receipt mockup */}
          <motion.div
            style={{ rotateX: springY, rotateY: springX }}
            className="relative mx-auto perspective-[1000px]"
          >
            <motion.div
              animate={
                phase === "shatter"
                  ? { scale: 0, opacity: 0, rotateY: 15 }
                  : { scale: 1, opacity: 1, rotateY: phase === "reveal" ? 5 : 0 }
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative mx-auto w-48 md:w-56"
            >
              <div className="float rounded-lg border border-white/10 bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 shadow-2xl shadow-black/50">
                <div className="mb-3 text-center text-[10px] font-mono text-zinc-500">
                  WHOLE FOODS MARKET
                </div>
                <div className="space-y-1.5 border-t border-dashed border-zinc-600 pt-3">
                  {["Milk .............. 4.99", "Bread ............. 5.49", "Avocados .......... 3.99", "Coffee ............ 12.99"].map(
                    (line) => (
                      <div key={line} className="font-mono text-[9px] text-zinc-400">
                        {line}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-3 border-t border-zinc-600 pt-2 text-right font-mono text-[10px] text-emerald-400">
                  TOTAL: $27.46
                </div>
              </div>
              {/* 3D depth shadow */}
              <div className="absolute -inset-4 -z-10 rounded-xl bg-emerald-500/10 blur-2xl" />
            </motion.div>
          </motion.div>

          {/* Shattered item cards */}
          {phase === "shatter" &&
            itemCards.map((card, i) => {
              const rad = (card.angle * Math.PI) / 180;
              const x = Math.cos(rad) * card.dist;
              const y = Math.sin(rad) * card.dist;
              return (
                <motion.div
                  key={card.name}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.6, type: "spring" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="glass rounded-lg px-3 py-2 text-left shadow-lg shadow-emerald-500/10">
                    <div className="text-xs font-medium text-zinc-200">{card.name}</div>
                    <div className="text-[10px] text-emerald-400">{card.price}</div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Headline with scan reveal */}
        <div className="relative z-10 mt-4 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400"
          >
            {COMING_SOON_COPY.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl glow-emerald-text"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Split Life&apos;s Costs.
            <br />
            <span className="gradient-text">Effortlessly.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mt-6 max-w-xl text-lg text-zinc-400 md:text-xl"
        >
          Scan receipts. Extract items. Assign shares. Settle up together.
          <span className="mt-2 block text-base text-zinc-500 md:text-lg">
            {COMING_SOON_COPY.heroLine}
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <GlowButton href="/#cta" size="lg">
            {COMING_SOON_COPY.waitlistButton}
          </GlowButton>
          <GlassButton href="/how-it-works">See How It Works</GlassButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
