import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { parse as parseEnvFile } from "dotenv";

const SHOWCASE_ROOT = process.cwd();
const FARESHARE_ROOT = resolve(SHOWCASE_ROOT, "../FareShare");

function applyEnvFile(filePath: string, override: boolean) {
  if (!existsSync(filePath)) {
    return;
  }

  const parsed = parseEnvFile(readFileSync(filePath));

  for (const [key, value] of Object.entries(parsed)) {
    if (value === undefined || value.trim() === "") {
      continue;
    }

    if (override || process.env[key] === undefined || process.env[key]?.trim() === "") {
      process.env[key] = value;
    }
  }
}

/**
 * Load env in priority order (lowest → highest):
 * 1. Main FareShare app (shared scan/API credentials)
 * 2. This project's files (showcase-only values win; empty keys are ignored)
 */
export function loadSharedFareShareEnv() {
  for (const filePath of [
    resolve(FARESHARE_ROOT, ".env"),
    resolve(FARESHARE_ROOT, ".env.local"),
  ]) {
    applyEnvFile(filePath, false);
  }

  for (const filePath of [
    resolve(SHOWCASE_ROOT, ".env"),
    resolve(SHOWCASE_ROOT, ".env.local"),
  ]) {
    applyEnvFile(filePath, true);
  }
}

let bootstrapped = false;

/** Idempotent server env bootstrap for API routes and instrumentation. */
export function ensureServerEnv() {
  if (bootstrapped) {
    return;
  }

  loadSharedFareShareEnv();
  bootstrapped = true;
}
