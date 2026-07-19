"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlowButton } from "./ui/GlowButton";
import { FareShareLogo, FareShareWordmark } from "./FareShareLogo";
import { COMING_SOON_COPY } from "@/lib/marketing-content";
import { SafeLink } from "./ui/SafeLink";
import { cn } from "@/lib/utils";

const links = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "FAQ", href: "/faq" },
  { label: "Launch", href: "/#launch" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={cn(
        "fixed left-0 right-0 top-10 z-50 transition-all duration-500",
        scrolled
          ? "glass-strong py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        <SafeLink href="/" className="group flex items-center gap-2.5">
          <FareShareLogo size={36} className="transition-transform group-hover:scale-105" priority />
          <FareShareWordmark />
        </SafeLink>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <SafeLink
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-emerald-400"
            >
              {link.label}
            </SafeLink>
          ))}
          <GlowButton href="/#cta" size="md">
            {COMING_SOON_COPY.waitlistButton}
          </GlowButton>
        </div>

        <button
          type="button"
          className="md:hidden text-zinc-300"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <SafeLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-300 hover:text-emerald-400"
                >
                  {link.label}
                </SafeLink>
              ))}
              <GlowButton href="/#cta">{COMING_SOON_COPY.waitlistButton}</GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
