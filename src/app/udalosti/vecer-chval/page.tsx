import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { VecerChvalSection } from "@/components/udalosti/VecerChvalSection";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";

export const metadata = {
  title: "Večer chvál | Marana Tha",
  description: "Najbližší večer chvál spoločenstva Marana Tha v Prešove, Košiciach a Bardejove.",
};

export default function VecerChvalPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Frame at y=263 → titleTop=467 */}
        <PageHero
          title="Večer chvál"
          description="Večer chvál je srdcom nášho spoločenstva — čas spoločnej chvály, modlitby a prítomnosti Boha. Príď a prežívaj Boha s nami."
          image="/images/vecer-chval-hero.jpg"
          titleTop={467}
        />
        {/* Group 94 section — "Najbližší večer chvál" with 3 city cards */}
        <VecerChvalSection />
        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
