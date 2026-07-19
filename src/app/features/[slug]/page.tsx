import { notFound } from "next/navigation";

import { ClusterDocumentPage } from "@/components/marketing/ClusterDocumentPage";
import { getFeaturePage, listFeatureSlugs } from "@/lib/seo/cluster/feature-pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listFeatureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const document = getFeaturePage(slug);
  if (!document) {
    return {};
  }

  return buildPageMetadata({
    title: document.metaTitle ?? document.title,
    description: document.description,
    path: document.path,
    keywords: document.keywords,
  });
}

export default async function FeaturePage({ params }: PageProps) {
  const { slug } = await params;
  const document = getFeaturePage(slug);
  if (!document) {
    notFound();
  }

  return <ClusterDocumentPage document={document} />;
}
