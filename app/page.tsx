import { Hero } from "@/features/landing/Hero";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { Footer } from "@/features/layout/Footer";
import { ProcessSection } from "@/features/landing/ProcessSection";
import { ServiceSection } from "@/features/landing/ServiceSection";
import { ContactSection } from "@/features/landing/ContactSection";
import { 
  DynamicTeamGridSection,
  DynamicDiplomaSection,
  DynamicContactMessageSection 
} from '@/components/DynamicComponents';

export default function HomePage() {
  return (
    <div className="relative flex h-fit flex-col bg-background text-foreground">
      <div className="mt-16"></div>

      <LandingHeader />

      <Hero />

      <ProcessSection />

      <DynamicTeamGridSection />
      <DynamicDiplomaSection />

      <ServiceSection />

      <ContactSection />

      <DynamicContactMessageSection />

      <Footer />
    </div>
  );
}
