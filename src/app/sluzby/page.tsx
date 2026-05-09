import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SluzbyGrid } from "@/components/sluzby/SluzbyGrid";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";

export const metadata = {
  title: "Naša služba | Marana Tha",
  description: "Objavte rozmanité služby spoločenstva Marana Tha.",
};

export default async function SluzbyPage() {
  const ministries = await db.ministry.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, title: true, slug: true, description: true, coverImage: true, icon: true },
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Naša služba"
          description="Spoločenstvo Marana Tha ponúka rôzne formy služby pre všetkých — rodiny, mládež, mužov, ženy aj ostatných. Nájdi miesto, kde môžeš rásť a slúžiť."
          image="/images/sluzby-hero.jpg"
          titleTop={467}
        />
        <SluzbyGrid ministries={ministries} />
        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
