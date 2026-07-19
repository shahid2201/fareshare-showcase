import type { Metadata } from "next";

import WaitlistConfirmClient from "@/components/waitlist/WaitlistConfirmClient";

export const metadata: Metadata = {
  title: "Confirm waitlist — FareShare",
  robots: { index: false, follow: false },
};

export default async function WaitlistConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <WaitlistConfirmClient token={token ?? ""} />;
}

