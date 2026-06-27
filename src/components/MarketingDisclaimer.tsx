import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarketingDisclaimerProps = {
  children: ReactNode;
  className?: string;
  /** Use for form fields tied to disclaimer copy */
  id?: string;
};

export function MarketingDisclaimer({ children, className, id }: MarketingDisclaimerProps) {
  return (
    <p
      id={id}
      className={cn(
        "text-xs leading-relaxed text-zinc-600 [&_a]:text-emerald-400/90 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-emerald-300",
        className,
      )}
    >
      {children}
    </p>
  );
}
