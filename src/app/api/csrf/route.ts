import { NextResponse } from "next/server";

import { enforceSecureRoute } from "@/lib/api-security";
import { getOrCreateCsrfToken } from "@/lib/csrf/server";

export async function GET(request: Request) {
  const security = await enforceSecureRoute({
    request,
    requireCsrf: false,
    rateLimit: {
      limit: 60,
      windowMs: 15 * 60 * 1000,
    },
  });

  if (!security.ok) {
    return security.response;
  }

  const token = await getOrCreateCsrfToken();

  return NextResponse.json(
    { token },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
      },
    }
  );
}
