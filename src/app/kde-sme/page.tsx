import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { KdeSmeCards } from "@/components/kde-sme/KdeSmeCards";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";

export const metadata = {
  title: "Kde pôsobíme | Marana Tha",
  description: "Spoločenstvo Marana Tha pôsobí v troch mestách na východnom Slovensku — Prešov, Bardejov a Košice.",
};

export default function KdeSme() {
  return (
    <>
      <Navbar />
      <main>
        {/* Figma frame at y=263 → titleTop=467 (same as home frame) */}
        <PageHero
          title="Kde pôsobíme"
          description="Spoločenstvo Marana Tha pôsobí v troch mestách na východnom Slovensku. Každé mesto má svoju skupinu veriacich, ktorí sa stretávajú na chválach, modlitbách a formácii."
          image="/images/kde-sme-hero.jpg"
          titleTop={467}
        />
        <KdeSmeCards />
        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
