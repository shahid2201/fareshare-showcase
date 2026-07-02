import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { showcaseLegalDocuments } from "@/lib/legal/showcase-documents";

export const metadata: Metadata = {
  title: "Terms of Service — FareShare Website",
  description:
    "Terms governing use of the FareShare marketing website, waitlist, product previews, and optional demonstrations.",
};

export default function TermsOfServicePage() {
  return <LegalDocumentPage document={showcaseLegalDocuments.terms} />;
}
