import type { MetadataRoute } from "next";

import { PUBLIC_INDEXABLE_ROUTES } from "@/lib/seo/public-routes";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_INDEXABLE_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(`${route.updatedAt}T12:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
