import { createHash } from "crypto";
import {
  enforceSecureRoute,
  jsonError,
  jsonSuccess,
} from "@/lib/api-security";
import { ensureServerEnv } from "@/lib/env/bootstrap";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { hashClientIdentifier } from "@/lib/rate-limit";
import { betaSignupSchema } from "@/lib/validations/beta-signup";

export async function POST(request: Request) {
  ensureServerEnv();

  const security = await enforceSecureRoute({
    request,
    schema: betaSignupSchema,
    rateLimit: {
      limit: 5,
      windowMs: 15 * 60 * 1000,
    },
  });

  if (!security.ok) {
    return security.response;
  }

  const { email, company } = security.data!;

  if (company) {
    return jsonSuccess({ ok: true });
  }

  if (!isSupabaseConfigured()) {
    return jsonError("Beta signup is temporarily unavailable.", 503);
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return jsonError("Beta signup is temporarily unavailable.", 503);
  }

  const ipHash = createHash("sha256")
    .update(hashClientIdentifier(request))
    .digest("hex");
  const userAgent = request.headers.get("user-agent")?.slice(0, 512) ?? null;

  const { error } = await supabase.from("beta_signups").insert({
    email,
    ip_hash: ipHash,
    user_agent: userAgent,
  });

  if (error) {
    if (error.code === "23505") {
      return jsonSuccess({
        ok: true,
        message: "You are already on the beta list.",
      });
    }

    return jsonError("Unable to save your signup right now.", 500);
  }

  return jsonSuccess({
    ok: true,
    message: "Thanks! We will reach out when a beta spot opens.",
  });
}
