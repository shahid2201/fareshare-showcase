import { BackToFareShare } from "@/components/BackToFareShare";

interface AccountShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function AccountShell({ title, description, children }: AccountShellProps) {
  return (
    <div className="min-h-full bg-[#0a0a0b] text-zinc-200">
      <header className="border-b border-white/5 px-6 py-4">
        <BackToFareShare />
      </header>
      <main className="mx-auto max-w-lg px-6 py-10">
        <h1
          className="font-display text-2xl font-bold text-zinc-100"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
        ) : null}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
