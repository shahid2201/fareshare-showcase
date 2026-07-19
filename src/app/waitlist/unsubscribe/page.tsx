import type { Metadata } from "next";

import WaitlistUnsubscribeClient from "@/components/waitlist/WaitlistUnsubscribeClient";

export const metadata: Metadata = {
  title: "Unsubscribe waitlist — FareShare",
  robots: { index: false, follow: false },
};

export default async function WaitlistUnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <WaitlistUnsubscribeClient token={token ?? ""} />;
}

