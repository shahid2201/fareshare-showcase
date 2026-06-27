export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureServerEnv } = await import("@/lib/env/bootstrap");
    ensureServerEnv();
  }
}
