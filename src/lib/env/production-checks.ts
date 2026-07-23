import "server-only";

import { isTurnstileConfigured } from "@/lib/feature-flags.server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getShowcaseSiteUrl, isWaitlistEmailConfigured } from "@/lib/waitlist/config";

type ProductionCheck = {
  ok: boolean;
  missing: string[];
};

export function getWaitlistProductionCheck(): ProductionCheck {
  if (process.env.NODE_ENV !== "production") {
    return { ok: true, missing: [] };
  }

  const missing: string[] = [];

  if (!isSupabaseConfigured()) {
    missing.push("Supabase (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)");
  }

  if (!isWaitlistEmailConfigured()) {
    missing.push(
      "Waitlist SMTP (WAITLIST_SMTP_USER/PASSWORD or OUTLOOK_SMTP_USER/PASSWORD)",
    );
  }

  if (!isTurnstileConfigured()) {
    missing.push(
      "Cloudflare Turnstile (NEXT_PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY)",
    );
  }

  if (!process.env.RATE_LIMIT_SALT?.trim()) {
    missing.push("RATE_LIMIT_SALT");
  }

  // Prefer explicit site URL; fall back to getShowcaseSiteUrl (production default).
  const siteUrl = getShowcaseSiteUrl();
  if (!siteUrl || /localhost|127\.0\.0\.1/i.test(siteUrl)) {
    missing.push("SHOWCASE_SITE_URL or NEXT_PUBLIC_SITE_URL");
  }

  return { ok: missing.length === 0, missing };
}

export function assertWaitlistProductionReady(): void {
  const check = getWaitlistProductionCheck();

  if (!check.ok) {
    console.error(
      `[waitlist] Production configuration incomplete: ${check.missing.join(", ")}`,
    );
  }
}

export function getConfiguredShowcaseSiteUrl(): string {
  return getShowcaseSiteUrl();
}
