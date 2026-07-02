import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { showcaseLegalDocuments } from "@/lib/legal/showcase-documents";

export const metadata: Metadata = {
  title: "Privacy Policy — FareShare Website",
  description:
    "How the FareShare marketing website handles waitlist data, cookies, and optional demonstration processing.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage document={showcaseLegalDocuments["privacy-policy"]} />;
}
