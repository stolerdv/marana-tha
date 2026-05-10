import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { UdaiostiPageClient } from "@/components/udalosti/UdaiostiPageClient";

export const metadata = {
  title: "Udalosti | Marana Tha",
  description: "Nadchádzajúce meropriatia spoločenstva Marana Tha.",
};

export default async function UdaiostiPage() {
  const [upcoming, past] = await Promise.all([
    db.event.findMany({
      where: { published: true, startDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
      select: { id: true, title: true, slug: true, description: true, coverImage: true, startDate: true, endDate: true, location: true, isEveningOfPraise: true },
    }),
    db.event.findMany({
      where: { published: true, startDate: { lt: new Date() } },
      orderBy: { startDate: "desc" },
      take: 6,
      select: { id: true, title: true, slug: true, description: true, coverImage: true, startDate: true, endDate: true, location: true, isEveningOfPraise: true },
    }),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Udalosti" description="Pridaj sa k nám na naše pravidelné stretnutia a špeciálne meropriatia." image="/images/udalosti-hero.jpg" titleTop={467} />
        <UdaiostiPageClient upcoming={upcoming} past={past} />
      </main>
      <Footer />
    </>
  );
}
