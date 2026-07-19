import type { Metadata } from "next";
import { AccountShell } from "@/components/account/AccountShell";
import { GlowButton } from "@/components/ui/GlowButton";
import { SUPPORT_EMAIL } from "@/lib/account/constants";
import { buildMailtoHref } from "@/lib/security";

export const metadata: Metadata = {
  title: "Help & Support — FareShare",
  robots: { index: false, follow: false },
};

export default function AccountHelpPage() {
  const mailtoHref = buildMailtoHref(SUPPORT_EMAIL, {
    subject: "FareShare Support",
  });

  return (
    <AccountShell
      title="Help & Support"
      description="Reach our team directly. FAQ and in-app tickets are coming in a future release."
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm leading-relaxed text-zinc-400">
          For early access questions, billing help, or feedback, email us and we will
          respond as soon as we can.
        </p>
        <p className="mt-4 text-sm font-medium text-zinc-300">{SUPPORT_EMAIL}</p>
        <GlowButton href={mailtoHref} className="mt-6 w-full justify-center">
          Contact Support
        </GlowButton>
      </div>
    </AccountShell>
  );
}
