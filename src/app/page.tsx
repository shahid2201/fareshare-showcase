import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ScanExperience } from "@/components/ScanExperience";
import { ItemReview } from "@/components/ItemReview";
import { AssignmentFlow } from "@/components/AssignmentFlow";
import { DashboardSection } from "@/components/DashboardSection";
import { PrivacyTrust } from "@/components/PrivacyTrust";
import { PricingSection } from "@/components/PricingSection";
import { AppPreview } from "@/components/AppPreview";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ScanExperience />
        <ItemReview />
        <AssignmentFlow />
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
