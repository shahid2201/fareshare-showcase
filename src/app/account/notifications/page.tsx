import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountPlaceholder } from "@/components/account/AccountPlaceholder";
import { AccountShell } from "@/components/account/AccountShell";
import { FUTURE_ACCOUNT_ROUTES } from "@/lib/account/constants";
import { NOTIFICATION_PREFERENCES_UI_ENABLED } from "@/lib/feature-flags";

export const metadata: Metadata = {
  title: "Notification Settings — FareShare",
  robots: { index: false, follow: false },
};

export default function AccountNotificationsPage() {
  if (!NOTIFICATION_PREFERENCES_UI_ENABLED) {
    redirect("/account/profile");
  }

  const { title } = FUTURE_ACCOUNT_ROUTES.notifications;

  return (
    <AccountShell title={title}>
      <AccountPlaceholder message="Notification preferences are not available yet. This route is scaffolded for a future release." />
    </AccountShell>
  );
}
