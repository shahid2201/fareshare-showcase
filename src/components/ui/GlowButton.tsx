"use client";

import { motion } from "framer-motion";
import { sanitizeHref, isExternalHref } from "@/lib/security";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function GlowButton({
  children,
  href = "#cta",
  onClick,
  className,
  size = "md",
  type = "button",
  disabled = false,
}: GlowButtonProps) {
  const safeHref = sanitizeHref(href, "#cta");
  const external = isExternalHref(safeHref);
  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-4 text-base md:text-lg",
  };

  const inner = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-semibold",
        "bg-gradient-to-r from-emerald-500 to-emerald-400 text-black",
        "glow-emerald transition-shadow duration-300",
        "hover:shadow-[0_0_30px_rgba(16,185,129,0.5),0_0_80px_rgba(16,185,129,0.2)]",
        sizes[size],
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 rounded-full shimmer opacity-50" />
    </motion.span>
  );

  if (onClick || type !== "button") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="inline-block disabled:cursor-not-allowed"
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={safeHref}
      className="inline-block"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  );
}
