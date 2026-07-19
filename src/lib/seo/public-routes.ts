import { listAllClusterDocuments } from "@/lib/seo/cluster";

/** Indexable marketing & legal routes (excludes account, waitlist, API). */

export type PublicRoute = {
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
  updatedAt: string;
};

const CORE_ROUTES: readonly PublicRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, updatedAt: "2026-07-19" },
  {
    path: "/how-it-works",
    changeFrequency: "monthly",
    priority: 0.9,
    updatedAt: "2026-07-19",
  },
  { path: "/about", changeFrequency: "monthly", priority: 0.8, updatedAt: "2026-07-19" },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8, updatedAt: "2026-07-19" },
  {
    path: "/security-privacy",
    changeFrequency: "monthly",
    priority: 0.7,
    updatedAt: "2026-07-19",
  },
  { path: "/press", changeFrequency: "monthly", priority: 0.6, updatedAt: "2026-07-19" },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4, updatedAt: "2026-06-27" },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4, updatedAt: "2026-06-27" },
  {
    path: "/disclaimers",
    changeFrequency: "yearly",
    priority: 0.4,
    updatedAt: "2026-06-27",
  },
] as const;

function clusterPriority(path: string): number {
  if (path.startsWith("/for/")) return 0.75;
  if (path.startsWith("/guides/")) return 0.7;
  if (path.startsWith("/features/")) return 0.7;
  if (path.startsWith("/vs/")) return 0.65;
  return 0.6;
}

export const PUBLIC_INDEXABLE_ROUTES: readonly PublicRoute[] = [
  ...CORE_ROUTES,
  ...listAllClusterDocuments()
    .filter((doc) => doc.path !== "/security-privacy")
    .map((doc) => ({
      path: doc.path,
      changeFrequency: "monthly" as const,
      priority: clusterPriority(doc.path),
      updatedAt: doc.updatedAt,
    })),
];
