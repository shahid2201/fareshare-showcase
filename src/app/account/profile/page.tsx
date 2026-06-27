import type { Metadata } from "next";
import { AccountPlaceholder } from "@/components/account/AccountPlaceholder";
import { AccountShell } from "@/components/account/AccountShell";

export const metadata: Metadata = {
  title: "Profile — FareShare",
  robots: { index: false, follow: false },
};

export default function AccountProfilePage() {
  return (
    <AccountShell
      title="Profile"
      description="Profile settings will be available once sign-in launches."
    >
      <AccountPlaceholder message="This screen is reserved for a future release. No profile data is stored yet." />
    </AccountShell>
  );
}
