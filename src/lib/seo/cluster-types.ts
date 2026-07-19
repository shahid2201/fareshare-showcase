import type { FaqItem } from "@/lib/seo/faq-content";

export type ClusterSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ClusterDocument = {
  slug: string;
  path: string;
  eyebrow: string;
  title: string;
  /** Shorter title for <title>/OG when the H1 is long */
  metaTitle?: string;
  description: string;
  keywords: string[];
  definition: string;
  sections: ClusterSection[];
  faqs?: FaqItem[];
  relatedLinks: Array<{ href: string; label: string }>;
  breadcrumb: Array<{ name: string; path: string }>;
  /** ISO date used for sitemap lastmod */
  updatedAt: string;
  howTo?: {
    name: string;
    description: string;
    steps: Array<{ name: string; text: string }>;
  };
};
