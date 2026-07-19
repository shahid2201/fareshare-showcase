import { NextResponse } from "next/server";
import { z } from "zod";

import { ensureServerEnv } from "@/lib/env/bootstrap";
import { createAdminClient } from "@/lib/supabase/admin";
import { unsubscribeWaitlistByToken } from "@/lib/waitlist/service";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

const oneClickTokenSchema = z
  .string()
  .trim()
  .min(20)
  .max(200);

export async function GET(request: Request) {
  ensureServerEnv();

  const token = new URL(request.url).searchParams.get("token")?.trim();

  if (!token) {
    return NextResponse.redirect(
      new URL("/waitlist/error?reason=missing", request.url),
    );
  }

  // Redirect instead of unsubscribing on GET (pre-fetch safe).
  return NextResponse.redirect(
    new URL(`/waitlist/unsubscribe?token=${encodeURIComponent(token)}`, request.url),
  );
}

export async function POST(request: Request) {
  ensureServerEnv();

  const token = new URL(request.url).searchParams.get("token")?.trim();
  const parsed = oneClickTokenSchema.safeParse(token);

  // For idempotency + to avoid turning this into an oracle, we return 200
  // even if token is missing/invalid.
  if (!parsed.success) {
    return NextResponse.json({ ok: true });
  }

  const identifier = getClientIdentifier(request);
  const rateLimit = await checkRateLimit({
    identifier,
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  await unsubscribeWaitlistByToken(supabase, parsed.data);

  // Always return 200 for unsubscribe one-click.
  return NextResponse.json({ ok: true });
}

