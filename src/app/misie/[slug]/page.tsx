export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

export default async function MisiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = await db.mission.findUnique({ where: { slug, published: true } });
  if (!mission) notFound();

  const photos = (mission.photos as string[]) ?? [];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ height: "640px" }}>
          {mission.coverImage ? (
            <Image src={mission.coverImage} alt={mission.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ backgroundColor: "#1c1d1e" }} />
          )}
          <div className="absolute inset-0" style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1c1d1e 12%, transparent 60%, rgba(28,29,30,0.85) 100%)", mixBlendMode: "multiply" }} />

          <div className="relative z-10 flex flex-col justify-end h-full" style={{ paddingLeft: "235px", paddingRight: "235px", paddingBottom: "80px" }}>
            {/* Country badge */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full" style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#1c1d1e", letterSpacing: "2px", textTransform: "uppercase" }}>
                {mission.country}
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 700, color: "#fdf5f2", lineHeight: 1.05, letterSpacing: "-1px", maxWidth: "800px" }}>
              {mission.title}
            </h1>
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 400, color: "rgba(253,245,242,0.75)", marginTop: "16px", maxWidth: "560px", lineHeight: 1.6 }}>
              {mission.description}
            </p>
          </div>
        </section>

        {/* Content */}
        {mission.content && (
          <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
            <div style={{ paddingLeft: "235px", paddingRight: "235px", maxWidth: "860px" }}>
              <div
                className="prose prose-lg max-w-none"
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", lineHeight: 1.8, color: "#1c1d1e" }}
                dangerouslySetInnerHTML={{ __html: mission.content }}
              />
            </div>
          </section>
        )}

        {/* Photo gallery */}
        {photos.length > 0 && (
          <section className="bg-[var(--color-cream)]" style={{ paddingTop: "20px", paddingBottom: "80px" }}>
            <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
              <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "36px", fontWeight: 700, color: "#1c1d1e", marginBottom: "32px" }}>
                Fotografie z misie
              </h2>
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                {photos.map((url, i) => (
                  <div key={i} className="overflow-hidden rounded-[12px]" style={{ aspectRatio: "4/3", position: "relative" }}>
                    <Image src={url} alt={`${mission.title} — foto ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px" }}>
            <Link href="/misie" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#bea055" }}>
              ← Späť na misie
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
