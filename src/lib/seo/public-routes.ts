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
};

export const PUBLIC_INDEXABLE_ROUTES: readonly PublicRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/disclaimers", changeFrequency: "yearly", priority: 0.4 },
] as const;
