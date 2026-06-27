"use client";

import { motion } from "framer-motion";
import { sanitizeHref, isExternalHref } from "@/lib/security";
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
  const safeHref = sanitizeHref(href, "#scan");
  const external = isExternalHref(safeHref);

  return (
    <motion.a
      href={safeHref}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
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
