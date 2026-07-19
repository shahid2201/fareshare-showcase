import type { MetadataRoute } from "next";

import { PUBLIC_INDEXABLE_ROUTES } from "@/lib/seo/public-routes";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_INDEXABLE_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
