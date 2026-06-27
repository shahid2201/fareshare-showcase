import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountPlaceholder } from "@/components/account/AccountPlaceholder";
import { AccountShell } from "@/components/account/AccountShell";
import { FUTURE_ACCOUNT_ROUTES } from "@/lib/account/constants";
import { SECURE_LOGIN_UI_ENABLED } from "@/lib/feature-flags";

export const metadata: Metadata = {
  title: "Two-Factor Authentication — FareShare",
  robots: { index: false, follow: false },
};

export default function AccountSecurityPage() {
  if (!SECURE_LOGIN_UI_ENABLED) {
    redirect("/account/profile");
  }

  const { title } = FUTURE_ACCOUNT_ROUTES.mfa;

  return (
    <AccountShell title={title}>
      <AccountPlaceholder message="Two-factor authentication is not available yet. This route is scaffolded for a future release." />
    </AccountShell>
  );
}
