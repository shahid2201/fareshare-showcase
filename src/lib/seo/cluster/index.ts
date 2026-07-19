import type { ClusterDocument } from "@/lib/seo/cluster-types";
import { FEATURE_PAGES, listFeatureSlugs } from "@/lib/seo/cluster/feature-pages";
import { FOR_PAGES, listForSlugs } from "@/lib/seo/cluster/for-pages";
import { GUIDE_PAGES, listGuideSlugs } from "@/lib/seo/cluster/guide-pages";
import { SECURITY_PRIVACY_PAGE } from "@/lib/seo/cluster/security-privacy-page";
import { VS_PAGES, listVsSlugs } from "@/lib/seo/cluster/vs-pages";

export function listAllClusterDocuments(): ClusterDocument[] {
  return [
    ...Object.values(FOR_PAGES),
    ...Object.values(GUIDE_PAGES),
    ...Object.values(FEATURE_PAGES),
    ...Object.values(VS_PAGES),
    SECURITY_PRIVACY_PAGE,
  ];
}

export function listClusterStaticParams(kind: "for" | "guides" | "features" | "vs") {
  const slugs =
    kind === "for"
      ? listForSlugs()
      : kind === "guides"
        ? listGuideSlugs()
        : kind === "features"
          ? listFeatureSlugs()
          : listVsSlugs();

  return slugs.map((slug) => ({ slug }));
}
