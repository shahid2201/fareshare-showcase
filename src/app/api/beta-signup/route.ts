import { createHash } from "crypto";

import {
  enforceSecureRoute,
  jsonError,
  jsonSuccess,
} from "@/lib/api-security";
import { ensureServerEnv } from "@/lib/env/bootstrap";
import { getWaitlistProductionCheck } from "@/lib/env/production-checks";
import { isTurnstileConfigured, isTurnstileRequired } from "@/lib/feature-flags.server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getClientIp, hashClientIdentifier } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile/server";
import { isWaitlistEmailConfigured } from "@/lib/waitlist/config";
import {
  registerWaitlistSignup,
  waitlistSignupMessage,
} from "@/lib/waitlist/service";
import { isDisposableEmail } from "@/lib/validations/disposable-email";
import {
  betaSignupSchema,
  validateFormTiming,
} from "@/lib/validations/beta-signup";

export async function POST(request: Request) {
  ensureServerEnv();

  const productionCheck = getWaitlistProductionCheck();
  if (!productionCheck.ok) {
    return jsonError("Waitlist signup is temporarily unavailable.", 503);
  }

  const security = await enforceSecureRoute({
    request,
    schema: betaSignupSchema,
    rateLimit: {
      limit: 3,
      windowMs: 60 * 60 * 1000,
    },
  });

  if (!security.ok) {
    return security.response;
  }

  const { email, company, formStartedAt, turnstileToken } = security.data!;

  if (company) {
    return jsonSuccess({ ok: true });
  }

  const timingError = validateFormTiming(formStartedAt);
  if (timingError) {
    return jsonError(timingError, 400);
  }

  if (isDisposableEmail(email)) {
    return jsonError("Please use a personal or work email address.", 400);
  }

  if (isTurnstileRequired()) {
    if (!isTurnstileConfigured()) {
      return jsonError("Waitlist signup is temporarily unavailable.", 503);
    }

    const verified = await verifyTurnstileToken(
      turnstileToken ?? "",
      getClientIp(request),
    );

    if (!verified) {
      return jsonError("Verification failed. Please try again.", 403);
    }
  }

  if (!isSupabaseConfigured()) {
    return jsonError("Waitlist signup is temporarily unavailable.", 503);
  }

  if (!isWaitlistEmailConfigured() && process.env.NODE_ENV === "production") {
    return jsonError("Waitlist signup is temporarily unavailable.", 503);
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return jsonError("Waitlist signup is temporarily unavailable.", 503);
  }

  const ipHash = createHash("sha256")
    .update(hashClientIdentifier(request))
    .digest("hex");
  const userAgent = request.headers.get("user-agent")?.slice(0, 512) ?? null;

  try {
    const result = await registerWaitlistSignup(supabase, {
      email,
      ipHash,
      userAgent,
    });

    return jsonSuccess({
      ok: true,
      message: waitlistSignupMessage(result),
    });
  } catch (error) {
    console.error("[waitlist] signup failed:", error);
    return jsonError("Unable to complete your waitlist signup right now.", 500);
  }
}
