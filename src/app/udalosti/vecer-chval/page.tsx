export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { VecerChvalSection } from "@/components/udalosti/VecerChvalSection";
import { AddToCalendar } from "@/components/udalosti/AddToCalendar";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";

export const metadata = {
  title: "Večer chvál | Marana Tha",
  description: "Najbližší večer chvál spoločenstva Marana Tha.",
};

export default async function VecerChvalPage() {
  // Read from DB — find the nearest upcoming Evening of Praise event
  const event = await db.event.findFirst({
    where: { isEveningOfPraise: true, published: true },
    orderBy: { startDate: "asc" },
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={event?.title ?? "Večer chvál"}
          description={event?.description ?? "Večer chvál je srdcom nášho spoločenstva — čas spoločnej chvály, modlitby a prítomnosti Boha. Príď a prežívaj Boha s nami."}
          image={event?.coverImage ?? "/images/vecer-chval-hero.jpg"}
          titleTop={467}
        />
        {event && (
          <div className="bg-[var(--color-cream)]" style={{ paddingLeft: "235px", paddingRight: "235px", paddingTop: "32px" }}>
            <AddToCalendar
              eventId={event.id}
              title={event.title}
              description={event.description}
              startDate={event.startDate}
              endDate={event.endDate}
              location={event.location}
            />
          </div>
        )}
        <VecerChvalSection />
        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
