import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountPlaceholder } from "@/components/account/AccountPlaceholder";
import { AccountShell } from "@/components/account/AccountShell";
import { FUTURE_ACCOUNT_ROUTES } from "@/lib/account/constants";
import { SESSION_MANAGEMENT_UI_ENABLED } from "@/lib/feature-flags";

export const metadata: Metadata = {
  title: "Session Management — FareShare",
  robots: { index: false, follow: false },
};

export default function AccountSessionsPage() {
  if (!SESSION_MANAGEMENT_UI_ENABLED) {
    redirect("/account/profile");
  }

  const { title } = FUTURE_ACCOUNT_ROUTES.sessions;

  return (
    <AccountShell title={title}>
      <AccountPlaceholder message="Session management requires sign-in and is not available yet." />
    </AccountShell>
  );
}
