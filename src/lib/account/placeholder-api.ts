import { jsonError } from "@/lib/api-security";

export function notImplementedAccountFeature(_feature?: string) {
  return jsonError("This feature is not available yet.", 501);
}
