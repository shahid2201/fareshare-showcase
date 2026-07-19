import { randomBytes } from "crypto";

export function createWaitlistToken(): string {
  return randomBytes(32).toString("base64url");
}
