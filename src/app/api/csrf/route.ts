import { NextResponse } from "next/server";

import { getOrCreateCsrfToken } from "@/lib/csrf/server";

export async function GET() {
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
