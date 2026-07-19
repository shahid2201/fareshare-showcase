import "server-only";

import { PUBLIC_INDEXABLE_ROUTES } from "@/lib/seo/public-routes";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site";

/** Public IndexNow key hosted at /{INDEXNOW_KEY}.txt */
export const INDEXNOW_KEY = "fareshare-idx-9f3c2a1b7e84";

export function getIndexNowKeyLocation(): string {
  return absoluteUrl(`/${INDEXNOW_KEY}.txt`);
}

export function listIndexNowUrls(paths?: string[]): string[] {
  if (paths?.length) {
    return paths.map((path) => absoluteUrl(path));
  }

  return PUBLIC_INDEXABLE_ROUTES.map((route) => absoluteUrl(route.path));
}

export async function submitToIndexNow(paths?: string[]): Promise<{
  ok: boolean;
  status: number;
  submitted: number;
  body: string;
}> {
  const host = new URL(getSiteUrl()).host;
  const urlList = listIndexNowUrls(paths);

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: getIndexNowKeyLocation(),
      urlList,
    }),
  });

  const body = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    submitted: urlList.length,
    body,
  };
}
