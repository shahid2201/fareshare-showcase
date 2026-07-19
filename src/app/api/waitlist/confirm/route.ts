import { NextResponse } from "next/server";
import { z } from "zod";

import { ensureServerEnv } from "@/lib/env/bootstrap";
import { enforceSecureRoute, jsonError, jsonSuccess } from "@/lib/api-security";
import { createAdminClient } from "@/lib/supabase/admin";
import { confirmWaitlistByToken } from "@/lib/waitlist/service";

export async function GET(request: Request) {
  ensureServerEnv();

  const token = new URL(request.url).searchParams.get("token")?.trim();

  if (!token) {
    return NextResponse.redirect(
      new URL("/waitlist/error?reason=missing", request.url),
    );
  }

  // Backward compatibility: old email links used to call this endpoint directly.
  // Redirecting to the page prevents scanners/pre-fetchers from triggering state changes.
  return NextResponse.redirect(
    new URL(`/waitlist/confirm?token=${encodeURIComponent(token)}`, request.url),
  );
}

const confirmTokenSchema = z.object({
  token: z
    .string()
    .trim()
    .min(20)
    .max(200),
});

export async function POST(request: Request) {
  ensureServerEnv();

  const security = await enforceSecureRoute({
    request,
    schema: confirmTokenSchema,
    requireCsrf: false,
    rateLimit: {
      limit: 10,
      windowMs: 60 * 60 * 1000,
    },
  });

  if (!security.ok) {
    return security.response;
  }

  try {
    const { token } = security.data!;
    const supabase = createAdminClient();
    if (!supabase) {
      return jsonError("Waitlist actions are temporarily unavailable.", 503);
    }

    const result = await confirmWaitlistByToken(supabase, token);

    if (result === "invalid") {
      return jsonError("Invalid or already used token.", 400);
    }

    if (result === "already_confirmed") {
      return jsonSuccess({ ok: true, state: "already_confirmed" });
    }

    return jsonSuccess({ ok: true, state: "confirmed" });
  } catch (error) {
    console.error("[waitlist] confirm failed:", error);
    return jsonError("Waitlist actions are temporarily unavailable.", 503);
  }
}
