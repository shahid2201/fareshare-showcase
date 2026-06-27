import type { Metadata } from "next";
import { AccountPlaceholder } from "@/components/account/AccountPlaceholder";
import { AccountShell } from "@/components/account/AccountShell";
import { FUTURE_ACCOUNT_ROUTES } from "@/lib/account/constants";

export const metadata: Metadata = {
  title: "Privacy Settings — FareShare",
  robots: { index: false, follow: false },
};

export default function AccountPrivacySettingsPage() {
  const { title } = FUTURE_ACCOUNT_ROUTES["privacy-settings"];

  return (
    <AccountShell title={title}>
      <AccountPlaceholder message="Privacy preferences are not available yet. Read our Privacy Policy for current data practices." />
    </AccountShell>
  );
}
