import { cn } from "@/lib/utils";

type FareShareLogoProps = {
  variant?: "mark" | "full";
  size?: number;
  className?: string;
  priority?: boolean;
};

export function FareShareLogo({
  variant = "mark",
  size = 36,
  className,
  priority,
}: FareShareLogoProps) {
  const src = variant === "full" ? "/logo.svg" : "/logo-mark.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG brand asset with fixed dimensions
    <img
      src={src}
      alt="FareShare"
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("shrink-0 object-contain", className)}
    />
  );
}

export function FareShareWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-display text-xl font-bold tracking-tight", className)}
      style={{ fontFamily: "var(--font-syne)" }}
    >
      Fare<span className="text-emerald-400">Share</span>
    </span>
  );
}
