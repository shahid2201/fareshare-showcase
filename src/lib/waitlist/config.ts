import "server-only";

import { getSiteUrl } from "@/lib/seo/site";

export function getShowcaseSiteUrl(): string {
  return getSiteUrl();
}

export function isWaitlistEmailConfigured(): boolean {
  const user =
    process.env.WAITLIST_SMTP_USER?.trim() ??
    process.env.OUTLOOK_SMTP_USER?.trim();
  const pass =
    process.env.WAITLIST_SMTP_PASSWORD?.trim() ??
    process.env.OUTLOOK_SMTP_PASSWORD?.trim();

  return Boolean(user && pass);
}

export function getWaitlistFromEmail(): string | null {
  return (
    process.env.WAITLIST_FROM_EMAIL?.trim() ??
    process.env.WAITLIST_SMTP_USER?.trim() ??
    process.env.OUTLOOK_SMTP_USER?.trim() ??
    null
  );
}

export const CONFIRMATION_RESEND_MIN_MS = 5 * 60 * 1000;
