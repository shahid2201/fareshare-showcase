import { jsonError } from "@/lib/api-security";

/** Receipt scan demo is permanently disabled on the public showcase. */
export async function POST() {
  return jsonError("Not found.", 404);
}
