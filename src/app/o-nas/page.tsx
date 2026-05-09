import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { ONasHero } from "@/components/o-nas/ONasHero";
import { ONasStats } from "@/components/o-nas/ONasStats";
import { ONasPossobenie } from "@/components/o-nas/ONasPossobenie";
import { ONasHodnoty } from "@/components/o-nas/ONasHodnoty";
import { ONasSvedectva } from "@/components/o-nas/ONasSvedectva";
import { ONasPartnerstva } from "@/components/o-nas/ONasPartnerstva";
import { ZistitViac } from "@/components/shared/ZistitViac";

export const metadata = {
  title: "O nás | Marana Tha",
  description: "Spoločenstvo Marana Tha je katolícke spoločenstvo detí, mládeže a dospelých v Prešove, Bardejove a Košiciach.",
};

export default function ONasPage() {
  return (
    <>
      <Navbar />
      <main>
        <ONasHero />
        <ONasStats />
        <ONasPossobenie />
        <ONasHodnoty />
        <ONasSvedectva />
        <ONasPartnerstva />
        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
