import { NextResponse } from "next/server";
import { z } from "zod";

import { submitToIndexNow } from "@/lib/seo/indexnow";

export const runtime = "nodejs";

const bodySchema = z
  .object({
    paths: z.array(z.string().min(1).max(200)).max(100).optional(),
  })
  .optional();

function isAuthorized(request: Request): boolean {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET?.trim();
  if (!secret) {
    return false;
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return false;
  }

  return header.slice("Bearer ".length) === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let paths: string[] | undefined;
  try {
    const json = await request.json().catch(() => undefined);
    const parsed = bodySchema.parse(json);
    paths = parsed?.paths;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const result = await submitToIndexNow(paths);
    return NextResponse.json(result, { status: result.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ error: "IndexNow request failed" }, { status: 502 });
  }
}
