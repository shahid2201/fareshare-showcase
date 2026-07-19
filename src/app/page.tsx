import { Navbar } from "@/components/Navbar";
import { EarlyAccessBanner } from "@/components/EarlyAccessBanner";
import { HeroSection } from "@/components/HeroSection";
import { ScanExperience } from "@/components/ScanExperience";
import { ItemReview } from "@/components/ItemReview";
import { AssignmentFlow } from "@/components/AssignmentFlow";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { DashboardSection } from "@/components/DashboardSection";
import { PrivacyTrust } from "@/components/PrivacyTrust";
import { LaunchSection } from "@/components/LaunchSection";
import { AppPreview } from "@/components/AppPreview";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo/site";

export const metadata = buildPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          buildOrganizationJsonLd(),
          buildWebSiteJsonLd(),
          buildSoftwareApplicationJsonLd(),
        ]}
      />
      <EarlyAccessBanner />
      <Navbar />
      <main>
        <HeroSection />
        <ScanExperience />
        <ItemReview />
        <AssignmentFlow />
        <FeaturesShowcase />
        <DashboardSection />
        <PrivacyTrust />
        <LaunchSection />
        <AppPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
