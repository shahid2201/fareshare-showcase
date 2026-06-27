"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { COMING_SOON_COPY } from "@/lib/marketing-content";
import { SafeLink } from "./ui/SafeLink";

export function EarlyAccessBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-[60] border-b border-emerald-500/25 bg-[#071210]/95 backdrop-blur-md"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10" />
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2.5 text-center text-xs sm:text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 sm:text-xs">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          {COMING_SOON_COPY.badge}
        </span>
        <p className="text-zinc-300">
          <span className="font-medium text-zinc-100">{COMING_SOON_COPY.bannerLead}</span>{" "}
          {COMING_SOON_COPY.bannerOffer}
        </p>
        <SafeLink
          href="#cta"
          className="font-semibold text-emerald-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
        >
          {COMING_SOON_COPY.bannerCta} →
        </SafeLink>
      </div>
    </motion.div>
  );
}
