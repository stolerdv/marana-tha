export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { VecerChvalSection } from "@/components/udalosti/VecerChvalSection";
import { VecerChvalCityTabs } from "@/components/udalosti/VecerChvalCityTabs";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";

export const metadata = {
  title: "Večer chvál | Marana Tha",
  description: "Večer chvál spoločenstva Marana Tha — Prešov, Košice, Bardejov.",
};

export default async function VecerChvalPage() {
  // Load all upcoming VCH events grouped by city
  const events = await db.event.findMany({
    where: {
      isEveningOfPraise: true,
      published: true,
      startDate: { gte: new Date() },
    },
    orderBy: { startDate: "asc" },
    select: { id: true, title: true, slug: true, startDate: true, endDate: true, location: true, description: true },
  });

  // Group by city (location field)
  const eventsByCity: Record<string, typeof events> = {
    Prešov: [],
    Košice: [],
    Bardejov: [],
  };
  for (const e of events) {
    const city = e.location ?? "";
    if (city in eventsByCity) {
      eventsByCity[city].push(e);
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Večer chvál"
          description="Večer chvál je srdcom nášho spoločenstva — čas spoločnej chvály, modlitby a prítomnosti Boha. Príď a prežívaj Boha s nami."
          image="/images/vecer-chval-hero.jpg"
          titleTop={467}
        />

        {/* City tabs with upcoming dates */}
        <VecerChvalCityTabs eventsByCity={eventsByCity} />

        <VecerChvalSection />
        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
