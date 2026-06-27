import { randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { CSRF_COOKIE_NAME, csrfCookieOptions } from "./constants";

const CSRF_TOKEN_PATTERN = /^[a-f0-9]{64}$/;

export function generateCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

export function isValidCsrfTokenFormat(
  token: string | null | undefined
): token is string {
  return typeof token === "string" && CSRF_TOKEN_PATTERN.test(token);
}

export function verifyCsrfToken(
  submittedToken: string | null | undefined,
  cookieToken: string | null | undefined
): boolean {
  if (!isValidCsrfTokenFormat(submittedToken) || !isValidCsrfTokenFormat(cookieToken)) {
    return false;
  }

  const submittedBuffer = Buffer.from(submittedToken);
  const cookieBuffer = Buffer.from(cookieToken);

  if (submittedBuffer.length !== cookieBuffer.length) {
    return false;
  }

  return timingSafeEqual(submittedBuffer, cookieBuffer);
}

export async function getCsrfCookieToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const value = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  return isValidCsrfTokenFormat(value) ? value : undefined;
}

/** Reuse an existing valid cookie token, or mint and persist a new one. */
export async function getOrCreateCsrfToken(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (isValidCsrfTokenFormat(existing)) {
    return existing;
  }

  const token = generateCsrfToken();
  const isProduction = process.env.NODE_ENV === "production";
  cookieStore.set(CSRF_COOKIE_NAME, token, csrfCookieOptions(isProduction));
  return token;
}
