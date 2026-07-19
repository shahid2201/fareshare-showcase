import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account/", "/waitlist/", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/about", "/how-it-works", "/faq", "/terms", "/privacy", "/disclaimers"],
        disallow: ["/account/", "/waitlist/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/about", "/how-it-works", "/faq", "/terms", "/privacy", "/disclaimers"],
        disallow: ["/account/", "/waitlist/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/about", "/how-it-works", "/faq", "/terms", "/privacy", "/disclaimers"],
        disallow: ["/account/", "/waitlist/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/about", "/how-it-works", "/faq", "/terms", "/privacy", "/disclaimers"],
        disallow: ["/account/", "/waitlist/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/about", "/how-it-works", "/faq", "/terms", "/privacy", "/disclaimers"],
        disallow: ["/account/", "/waitlist/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
