import { Navbar } from "@/components/Navbar";
import { EarlyAccessBanner } from "@/components/EarlyAccessBanner";
import { HeroSection } from "@/components/HeroSection";
import { ScanExperience } from "@/components/ScanExperience";
import { ItemReview } from "@/components/ItemReview";
import { AssignmentFlow } from "@/components/AssignmentFlow";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { DashboardSection } from "@/components/DashboardSection";
import { PrivacyTrust } from "@/components/PrivacyTrust";
import { PricingSection } from "@/components/PricingSection";
import { AppPreview } from "@/components/AppPreview";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
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
        <PricingSection />
        <AppPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
