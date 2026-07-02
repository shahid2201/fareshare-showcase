import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FareShare — Split Life's Costs. Effortlessly.",
  description:
    "Scan receipts. Extract items. Assign shares. Settle instantly. FareShare makes splitting bills feel like clarity, not math.",
  keywords: [
    "bill splitting",
    "receipt scanner",
    "expense sharing",
    "roommate expenses",
    "FareShare",
  ],
  icons: {
    icon: "/favicon.svg",
    apple: "/logo-mark.svg",
  },
  openGraph: {
    title: "FareShare — Split Life's Costs. Effortlessly.",
    description:
      "Scan receipts. Extract items. Assign shares. Settle instantly.",
    type: "website",
    images: [{ url: "/logo.svg", width: 240, height: 240, alt: "FareShare" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
