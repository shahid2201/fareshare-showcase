import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { CSRF_HEADER_NAME } from "@/lib/csrf/constants";
import {
  getCsrfCookieToken,
  verifyCsrfToken,
} from "@/lib/csrf/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

type SecureRouteOptions<T> = {
  request: Request;
  schema?: ZodType<T>;
  rateLimit?: {
    limit: number;
    windowMs: number;
    key?: string;
  };
  requireCsrf?: boolean;
};

type SecureRouteSuccess<T> = {
  ok: true;
  data?: T;
  identifier: string;
};

type SecureRouteFailure = {
  ok: false;
  response: NextResponse;
};

export async function enforceSecureRoute<T>(
  options: SecureRouteOptions<T>
): Promise<SecureRouteSuccess<T> | SecureRouteFailure> {
  const identifier = getClientIdentifier(options.request);

  if (options.rateLimit) {
    const rateLimitResult = await checkRateLimit({
      identifier: options.rateLimit.key ?? identifier,
      limit: options.rateLimit.limit,
      windowMs: options.rateLimit.windowMs,
    });

    if (!rateLimitResult.allowed) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: "Too many requests. Please try again later." },
          {
            status: 429,
            headers: {
              "Retry-After": String(
                Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)
              ),
            },
          }
        ),
      };
    }
  }

  if (options.requireCsrf !== false) {
    const cookieToken = await getCsrfCookieToken();
    const headerToken = options.request.headers.get(CSRF_HEADER_NAME);

    if (!verifyCsrfToken(headerToken, cookieToken)) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: "Invalid or missing CSRF token." },
          { status: 403 }
        ),
      };
    }
  }

  if (!options.schema) {
    return { ok: true, identifier };
  }

  let payload: unknown;

  try {
    payload = await options.request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      ),
    };
  }

  const parsed = options.schema.safeParse(payload);

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Invalid request payload.";

    return {
      ok: false,
      response: NextResponse.json({ error: message }, { status: 400 }),
    };
  }

  return { ok: true, data: parsed.data, identifier };
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonSuccess<T extends Record<string, unknown>>(
  payload: T,
  status = 200
) {
  return NextResponse.json(payload, { status });
}
