import { createHash } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

type MemoryEntry = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, MemoryEntry>();

function hashRateLimitKey(key: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "fareshare-dev-salt";
  return createHash("sha256").update(`${salt}:${key}`).digest("hex");
}

function checkMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || entry.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  memoryStore.set(key, entry);

  return {
    allowed: true,
    remaining: Math.max(limit - entry.count, 0),
    resetAt: entry.resetAt,
  };
}

async function checkSupabaseRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult | null> {
  const supabase = createAdminClient();
  if (!supabase) {
    return null;
  }

  const windowStart = new Date(Date.now() - windowMs).toISOString();

  const { count, error: countError } = await supabase
    .from("api_rate_limit_events")
    .select("*", { count: "exact", head: true })
    .eq("rate_key", key)
    .gte("created_at", windowStart);

  if (countError) {
    return null;
  }

  const currentCount = count ?? 0;
  const resetAt = Date.now() + windowMs;

  if (currentCount >= limit) {
    return { allowed: false, remaining: 0, resetAt };
  }

  const { error: insertError } = await supabase
    .from("api_rate_limit_events")
    .insert({ rate_key: key });

  if (insertError) {
    return null;
  }

  return {
    allowed: true,
    remaining: Math.max(limit - currentCount - 1, 0),
    resetAt,
  };
}

export async function checkRateLimit(options: {
  identifier: string;
  limit: number;
  windowMs: number;
}): Promise<RateLimitResult> {
  const key = hashRateLimitKey(options.identifier);
  const supabaseResult = await checkSupabaseRateLimit(
    key,
    options.limit,
    options.windowMs
  );

  if (supabaseResult) {
    return supabaseResult;
  }

  return checkMemoryRateLimit(key, options.limit, options.windowMs);
}

export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  return `${ip}:${userAgent.slice(0, 120)}`;
}

export function hashClientIdentifier(request: Request): string {
  return hashRateLimitKey(getClientIdentifier(request));
}
