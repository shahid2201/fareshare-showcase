import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { showcaseLegalDocuments } from "@/lib/legal/showcase-documents";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing use of the FareShare marketing website, waitlist, product previews, and optional demonstrations.",
  path: "/terms",
});

export default function TermsOfServicePage() {
  return <LegalDocumentPage document={showcaseLegalDocuments.terms} />;
}
