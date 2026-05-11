export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
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

export default async function HomePage() {
  // Load upcoming VCH events grouped by city
  const vchEvents = await db.event.findMany({
    where: { isEveningOfPraise: true, published: true, startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    select: { id: true, title: true, startDate: true, location: true, slug: true },
  });

  // Group by city, take nearest per city
  const byCity: Record<string, { date: Date; title: string; slug: string }> = {};
  for (const ev of vchEvents) {
    const city = ev.location ?? "Prešov";
    if (!byCity[city]) {
      byCity[city] = { date: ev.startDate, title: ev.title, slug: ev.slug };
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection vchByCity={byCity} />
        <AktualitySection />
        <ONasSection />
        <MisieSection />
        <ArchivSection />
        <PodporteNasSection />
        <NewsletterSection />
        <KontaktSection />
      </main>
      <Footer />
    </>
  );
}
