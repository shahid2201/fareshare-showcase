import type { Metadata } from "next";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_NAME,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/seo/site";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImageAlt?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImageAlt = SITE_NAME,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;

  return {
    // Use absolute titles so the root `%s — FareShare` template cannot double-suffix.
    title: { absolute: fullTitle },
    description,
    keywords: keywords ?? [...DEFAULT_KEYWORDS],
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export function buildRootMetadata(): Metadata {
  const metadataBase = new URL(getSiteUrl());

  return {
    metadataBase,
    title: {
      default: DEFAULT_TITLE,
      template: `%s — ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [...DEFAULT_KEYWORDS],
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: getSiteUrl() }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "productivity",
    icons: {
      icon: "/favicon.svg",
      apple: "/logo-mark.svg",
    },
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url: absoluteUrl("/"),
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: ["/opengraph-image"],
    },
  };
}
