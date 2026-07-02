import { SafeLink } from "./ui/SafeLink";
import { FareShareLogo, FareShareWordmark } from "./FareShareLogo";
import { SUPPORT_EMAIL } from "@/lib/account/constants";
import { DISCLAIMERS_LAST_UPDATED, FOOTER_DISCLAIMER_BLOCKS } from "@/lib/disclaimers";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080809] px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <SafeLink href="/" className="flex items-center gap-2.5">
            <FareShareLogo size={32} />
            <FareShareWordmark className="text-lg" />
          </SafeLink>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <SafeLink href="/terms" className="transition-colors hover:text-emerald-400">
              Terms of Service
            </SafeLink>
            <SafeLink href="/privacy" className="transition-colors hover:text-emerald-400">
              Privacy Policy
            </SafeLink>
            <SafeLink href="/disclaimers" className="transition-colors hover:text-emerald-400">
              Disclaimers
            </SafeLink>
            <SafeLink href="#launch" className="transition-colors hover:text-emerald-400">
              Launch
            </SafeLink>
            <SafeLink href="#scan" className="transition-colors hover:text-emerald-400">
              How It Works
            </SafeLink>
            <SafeLink href={`mailto:${SUPPORT_EMAIL}`} className="transition-colors hover:text-emerald-400">
              Contact
            </SafeLink>
          </div>

          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} FareShare. All rights reserved.
          </p>
        </div>

        <div className="mt-10 border-t border-white/5 pt-8">
          <p className="text-center text-[11px] uppercase tracking-widest text-zinc-600">
            Important disclaimers · Updated {DISCLAIMERS_LAST_UPDATED}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {FOOTER_DISCLAIMER_BLOCKS.map((block) => (
              <div key={block.title}>
                <h3 className="text-xs font-semibold text-zinc-400">{block.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">{block.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-600">
            <SafeLink href="/disclaimers" className="text-emerald-400/80 hover:text-emerald-300">
              Read full disclaimers
            </SafeLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
