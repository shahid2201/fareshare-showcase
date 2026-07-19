import { ClusterDocumentPage } from "@/components/marketing/ClusterDocumentPage";
import { SECURITY_PRIVACY_PAGE } from "@/lib/seo/cluster/security-privacy-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: SECURITY_PRIVACY_PAGE.title,
  description: SECURITY_PRIVACY_PAGE.description,
  path: SECURITY_PRIVACY_PAGE.path,
  keywords: SECURITY_PRIVACY_PAGE.keywords,
});

export default function SecurityPrivacyPage() {
  return <ClusterDocumentPage document={SECURITY_PRIVACY_PAGE} />;
}
