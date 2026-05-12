export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
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

export default async function ONasPage() {
  const [pc, partners] = await Promise.all([
    db.pageContent.findUnique({ where: { key: "o-nas" } }),
    db.partner.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }], select: { id: true, name: true, slug: true, description: true } }),
  ]);
  const data = (pc?.data ?? {}) as Record<string, string>;

  return (
    <>
      <Navbar />
      <main>
        <ONasHero
          title={pc?.title ?? undefined}
          description={pc?.subtitle ?? undefined}
          image={pc?.coverImage ?? undefined}
        />
        <ONasStats
          stat1Value={data.stat1Value ?? undefined}
          stat1Label={data.stat1Label ?? undefined}
          stat2Value={data.stat2Value ?? undefined}
          stat2Label={data.stat2Label ?? undefined}
          stat3Value={data.stat3Value ?? undefined}
          stat3Label={data.stat3Label ?? undefined}
        />
        <ONasPossobenie />
        <ONasHodnoty />
        <ONasSvedectva />
        <ONasPartnerstva partners={partners} />
        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
