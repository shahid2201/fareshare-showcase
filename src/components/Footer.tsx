export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080809] px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
            <span className="text-xs font-bold text-black">F</span>
          </div>
          <span
            className="font-display text-lg font-bold"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Fare<span className="text-emerald-400">Share</span>
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <a href="#privacy" className="transition-colors hover:text-emerald-400">
            Privacy
          </a>
          <a href="#pricing" className="transition-colors hover:text-emerald-400">
            Pricing
          </a>
          <a href="#scan" className="transition-colors hover:text-emerald-400">
            How It Works
          </a>
          <a href="mailto:hello@fareshare.app" className="transition-colors hover:text-emerald-400">
            Contact
          </a>
        </div>

        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} FareShare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
