import type { Metadata } from "next";
import { AccountPlaceholder } from "@/components/account/AccountPlaceholder";
import { AccountShell } from "@/components/account/AccountShell";

export const metadata: Metadata = {
  title: "Subscription — FareShare",
  robots: { index: false, follow: false },
};

export default function AccountSubscriptionPage() {
  return (
    <AccountShell
      title="Subscription"
      description="Plan management will be available once billing launches."
    >
      <AccountPlaceholder message="This screen is reserved for a future release. No subscriptions are active yet." />
    </AccountShell>
  );
}
