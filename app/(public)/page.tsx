import { AboutSection } from "@/components/sections/home/about-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { JournalSection } from "@/components/sections/home/journal-section";
import { NewsletterSection } from "@/components/sections/home/newsletter-section";
import { PillarsSection } from "@/components/sections/home/pillars-section";
import { ProgramsSection } from "@/components/sections/home/programs-section";
import { ProductsSection } from "@/components/sections/home/products-section";
import { ProgramRegistrationSection } from "@/components/sections/home/program-registration-section";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <AboutSection />
      <ProgramsSection />
      <ProductsSection />
      <TestimonialsSection />
      <ProgramRegistrationSection />
      <JournalSection />
      <NewsletterSection />
    </>
  );
}
