import { FareShareLogo, FareShareWordmark } from "@/components/FareShareLogo";
import { SafeLink } from "@/components/ui/SafeLink";
import { cn } from "@/lib/utils";

export function BackToFareShare({ className }: { className?: string }) {
  return (
    <SafeLink
      href="/"
      className={cn(
        "inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-emerald-400",
        className,
      )}
    >
      <FareShareLogo size={24} />
      <span>Back to</span>
      <FareShareWordmark className="text-sm" />
    </SafeLink>
  );
}
