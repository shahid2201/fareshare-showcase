import { SUPPORT_EMAIL } from "@/lib/account/constants";
import {
  BRAND_DEFINITION,
  BRAND_TAGLINE,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/seo/site";
import type { FaqItem } from "@/lib/seo/faq-content";

type JsonLd = Record<string, unknown>;

export function buildOrganizationJsonLd(): JsonLd {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: SITE_NAME,
    url,
    logo: absoluteUrl("/logo.svg"),
    description: BRAND_DEFINITION,
    email: SUPPORT_EMAIL,
    slogan: BRAND_TAGLINE,
    sameAs: [] as string[],
  };
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    inLanguage: "en",
  };
}

export function buildSoftwareApplicationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS, Android",
    description: BRAND_DEFINITION,
    url: getSiteUrl(),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
      description:
        "Join the waitlist for launch updates. Subscription pricing will be announced before release. Waitlist signup does not create an account or purchase a plan.",
      availability: "https://schema.org/PreOrder",
      url: absoluteUrl("/#cta"),
    },
    featureList: [
      "Receipt scanning",
      "Line-item extraction",
      "Per-item share assignment",
      "Household expense sharing",
      "Settlement tracking",
    ],
  };
}

export function buildFaqPageJsonLd(faqs: readonly FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildHowToJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to split a bill with FareShare",
    description:
      "Scan a receipt, review extracted items, assign shares to people, and settle up together.",
    totalTime: "PT5M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Scan the receipt",
        text: "Capture the receipt with your camera or enter items manually when there is no paper trail.",
        url: absoluteUrl("/how-it-works#scan"),
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Review extracted items",
        text: "Check item names, prices, and categories. Fix anything the scan got wrong before sharing.",
        url: absoluteUrl("/how-it-works#review"),
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Assign shares",
        text: "Assign each line to the right person — full items, partial shares, or household splits.",
        url: absoluteUrl("/how-it-works#assign"),
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Settle up",
        text: "Track what everyone owes and settle through supported in-app payment flows when available.",
        url: absoluteUrl("/how-it-works#settle"),
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
