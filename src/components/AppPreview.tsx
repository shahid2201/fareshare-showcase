"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  AccountScreen,
  ActivityScreen,
  FriendsScreen,
  HomeScreen,
  ItemsScreen,
  PhoneFrame,
  ReviewFlowScreen,
  ScanFlowScreen,
} from "./AppScreens";
import { MarketingDisclaimer } from "./MarketingDisclaimer";
import { SITE_DISCLAIMERS } from "@/lib/disclaimers";

const screens = [
  { label: "Home", component: HomeScreen },
  { label: "My Items", component: ItemsScreen },
  { label: "Activity", component: ActivityScreen },
  { label: "Friends", component: FriendsScreen },
  { label: "Scan", component: ScanFlowScreen },
  { label: "Review", component: ReviewFlowScreen },
  { label: "Account", component: AccountScreen },
];

export function AppPreview() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <section id="preview" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
            See It. Feel It.
          </span>
          <h2
            className="font-display text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            The app,{" "}
            <span className="gradient-text">in your hands</span>
          </h2>
          <p className="mt-4 text-zinc-500">
            Stylized previews of the screens you will use every day — from Home to settle-up.
          </p>
        </motion.div>

        <motion.div style={{ rotateX: rotate }} className="relative">
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin px-4 md:px-0">
            {screens.map((screen, i) => (
              <PhoneFrame key={screen.label} label={screen.label} index={i}>
                <screen.component />
              </PhoneFrame>
            ))}
          </div>
        </motion.div>

        <p className="mt-4 text-center text-xs text-zinc-600 md:hidden">
          ← Swipe to explore →
        </p>

        <MarketingDisclaimer className="mx-auto mt-6 max-w-2xl text-center">
          {SITE_DISCLAIMERS.previews} {SITE_DISCLAIMERS.sampleData}
        </MarketingDisclaimer>
      </div>
    </section>
  );
}
