import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AktivityGrid } from "@/components/aktivity/AktivityGrid";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";

export const metadata = {
  title: "Aktivity | Marana Tha",
  description: "Objavte aktivity spoločenstva Marana Tha — večery chvál, adorácie, konferencie a ďalšie stretnutia.",
};

export default function AktivityPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Frame at y=263 → titleTop=467 */}
        <PageHero
          title="Aktivity"
          description="Pripoj sa k našim pravidelným aktivitám a stretnutiam. Pre každého nájdeme miesto — či si mladý, rodina, muž alebo žena."
          image="/images/aktivity-hero.jpg"
          titleTop={467}
        />
        <AktivityGrid />
        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
