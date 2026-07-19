import { SafeLink } from "./ui/SafeLink";
import { FareShareLogo, FareShareWordmark } from "./FareShareLogo";
import { SUPPORT_EMAIL } from "@/lib/account/constants";
import { DISCLAIMERS_LAST_UPDATED, FOOTER_DISCLAIMER_BLOCKS } from "@/lib/disclaimers";

const PRODUCT_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/security-privacy", label: "Security & Privacy" },
  { href: "/press", label: "Press Kit" },
  { href: "/#launch", label: "Launch" },
] as const;

const EXPLORE_LINKS = [
  { href: "/for/roommates", label: "For Roommates" },
  { href: "/for/couples", label: "For Couples" },
  { href: "/for/friends-and-trips", label: "Friends & Trips" },
  { href: "/features/receipt-scanner", label: "Receipt Scanner" },
  { href: "/vs/splitwise", label: "vs Splitwise" },
  { href: "/vs/venmo", label: "vs Venmo" },
] as const;

const GUIDE_LINKS = [
  { href: "/guides/split-grocery-receipt", label: "Split a grocery receipt" },
  { href: "/guides/split-restaurant-bill", label: "Split a restaurant bill" },
  { href: "/guides/equal-vs-itemized-splits", label: "Equal vs itemized" },
  { href: "/guides/vacation-expense-splitting", label: "Vacation expenses" },
  { href: "/guides/roommate-expense-system", label: "Roommate expense system" },
] as const;

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/disclaimers", label: "Disclaimers" },
  { href: `mailto:${SUPPORT_EMAIL}`, label: "Contact" },
] as const;

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <SafeLink
              href={link.href}
              className="text-sm text-zinc-500 transition-colors hover:text-emerald-400"
            >
              {link.label}
            </SafeLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080809] px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <SafeLink href="/" className="flex items-center gap-2.5">
            <FareShareLogo size={32} />
            <FareShareWordmark className="text-lg" />
          </SafeLink>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            <FooterLinkColumn title="Product" links={PRODUCT_LINKS} />
            <FooterLinkColumn title="Explore" links={EXPLORE_LINKS} />
            <FooterLinkColumn title="Guides" links={GUIDE_LINKS} />
            <FooterLinkColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        <p className="mt-10 text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} FareShare. All rights reserved.
        </p>

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
