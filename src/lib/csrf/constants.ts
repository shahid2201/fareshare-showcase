export const CSRF_COOKIE_NAME = "fareshare-csrf-token";
export const CSRF_HEADER_NAME = "x-csrf-token";

export const CSRF_MAX_AGE_SECONDS = 60 * 60 * 8;

export function csrfCookieOptions(isProduction: boolean) {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: isProduction,
    path: "/",
    maxAge: CSRF_MAX_AGE_SECONDS,
  };
}
