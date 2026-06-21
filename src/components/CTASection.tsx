"use client";

import { motion } from "framer-motion";
import { GlowButton } from "./ui/GlowButton";
import { Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/8 blur-[120px]" />
      <div className="noise-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-6 inline-flex"
          >
            <Sparkles className="h-8 w-8 text-emerald-400" />
          </motion.div>

          <h2
            className="font-display text-4xl font-bold md:text-6xl glow-emerald-text"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Start Splitting{" "}
            <span className="gradient-text">Smarter</span>
          </h2>

          <p className="mt-6 text-lg text-zinc-400">
            10-user private app. Invite-only. Zero noise.
          </p>

          <div className="mt-10">
            <GlowButton href="mailto:hello@fareshare.app?subject=Private%20Beta%20Access" size="lg">
              Join the Private Beta
            </GlowButton>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-sm text-zinc-600"
          >
            FareShare — because life is better when costs are clear.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
