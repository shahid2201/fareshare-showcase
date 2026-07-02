import "server-only";

import { isTurnstileConfigured } from "@/lib/feature-flags.server";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return false;
  }

  const trimmed = token.trim();
  if (!trimmed) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: trimmed,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json()) as TurnstileVerifyResponse;
    return payload.success === true;
  } catch {
    return false;
  }
}
