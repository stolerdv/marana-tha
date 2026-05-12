export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import Link from "next/link";
import Image from "next/image";

export default async function MisiePage() {
  let missions: Awaited<ReturnType<typeof db.mission.findMany>> = [];
  try {
    missions = await db.mission.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  } catch (e) {
    console.error("Mission fetch error:", e);
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Misie"
          description="Spoločenstvo Marana Tha sa aktívne zapája do misijnej práce doma i v zahraničí. Spoznaj príbehy ľudí a krajín, kde nesieme vieru."
          image="/images/hero-bg.jpg"
          titleTop={467}
        />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="px-4 sm:px-8 lg:px-[235px]">

            {/* Section heading */}
            <div className="mb-12">
              <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#bea055" }}>
                Naše misie
              </span>
              <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "48px", fontWeight: 700, color: "#1c1d1e", marginTop: "12px", lineHeight: 1.1 }}>
                Krajiny kde slúžime
              </h2>
            </div>

            {missions.length === 0 ? (
              <div className="text-center py-24" style={{ color: "#635f5b", fontFamily: "var(--font-commissioner)", fontSize: "20px" }}>
                Misijné správy čoskoro pribúdajú. ({missions.length} záznamov)
              </div>
            ) : (
              <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                {missions.map((mission) => (
                  <Link key={mission.id} href={`/misie/${mission.slug}`} className="group block">
                    <div className="overflow-hidden rounded-[16px]" style={{ aspectRatio: "4/3", backgroundColor: "#e4d5b2", position: "relative" }}>
                      {mission.coverImage ? (
                        <Image
                          src={mission.coverImage}
                          alt={mission.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#2a2520" }}>
                          <span style={{ fontSize: "48px" }}>✝️</span>
                        </div>
                      )}
                      {/* Country badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(190,160,85,0.9)", fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#1c1d1e", letterSpacing: "1px", textTransform: "uppercase" }}>
                        {mission.country}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "22px", fontWeight: 700, color: "#1c1d1e", marginBottom: "8px", lineHeight: 1.2 }}>
                        {mission.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "#635f5b", lineHeight: 1.6 }}>
                        {mission.description}
                      </p>
                      <span className="inline-flex items-center gap-2 mt-4" style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#bea055" }}>
                        Čítať viac
                        <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4h12M9 1l3 3-3 3" stroke="#bea055" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
