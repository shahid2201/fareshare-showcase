"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function GlassButton({
  children,
  href = "#scan",
  className,
}: GlassButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.2)" }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium",
        "glass text-zinc-200 transition-all duration-300",
        "hover:bg-white/[0.08] hover:text-white",
        className
      )}
    >
      {children}
    </motion.a>
  );
}
