import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { showcaseLegalDocuments } from "@/lib/legal/showcase-documents";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How the FareShare marketing website handles waitlist data, cookies, and optional demonstration processing.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage document={showcaseLegalDocuments["privacy-policy"]} />;
}
