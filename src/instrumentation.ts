export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureServerEnv } = await import("@/lib/env/bootstrap");
    const { assertWaitlistProductionReady } = await import(
      "@/lib/env/production-checks"
    );

    ensureServerEnv();
    assertWaitlistProductionReady();
  }
}
