import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AktualitySection } from "@/components/home/AktualitySection";
import { ONasSection } from "@/components/home/ONasSection";
import { MisieSection } from "@/components/home/MisieSection";
import { ArchivSection } from "@/components/home/ArchivSection";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { KontaktSection } from "@/components/home/KontaktSection";
import { FullscreenButton } from "@/components/ui/FullscreenButton";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AktualitySection />
        <ONasSection />
        <MisieSection />
        <ArchivSection />
        <PodporteNasSection />
        <NewsletterSection />
        <KontaktSection />
      </main>
      <Footer />
      <FullscreenButton />
    </>
  );
}
