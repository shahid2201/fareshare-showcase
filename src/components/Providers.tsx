"use client";

import { CsrfProvider } from "@/components/CsrfProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CsrfProvider>{children}</CsrfProvider>;
}
