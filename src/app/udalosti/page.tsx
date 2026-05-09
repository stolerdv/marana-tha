import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import Link from "next/link";

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
      select: { id: true, title: true, slug: true, description: true, coverImage: true, startDate: true, location: true },
    }),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Udalosti" description="Pridaj sa k nám na naše pravidelné stretnutia a špeciálne meropriatia." image="/images/udalosti-hero.jpg" titleTop={467} />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

            {/* Upcoming */}
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "40px" }}>
              Nadchadzajúce udalosti
            </p>

            {upcoming.length === 0 ? (
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b", marginBottom: "60px" }}>Momentálne žiadne plánované meropriatia.</p>
            ) : (
              <div className="flex flex-col" style={{ marginBottom: "60px" }}>
                {upcoming.map((event, i) => (
                  <div key={event.id}>
                    <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                    <Link href={event.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${event.slug}`}
                      className="flex items-start py-6 hover:bg-[#f9efe2] transition-colors px-2 -mx-2 rounded-[8px]">
                      <div className="flex-1">
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", lineHeight: "1.3" }}>{event.title}</p>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 400, color: "#635f5b", marginTop: "4px" }}>
                          {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          {event.location && ` · ${event.location}`}
                        </p>
                      </div>
                      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "24px", color: "#bea055", marginTop: "4px" }}>→</span>
                    </Link>
                  </div>
                ))}
                <div style={{ height: "1px", backgroundColor: "#bea055" }} />
              </div>
            )}

            {/* Past events */}
            {past.length > 0 && (
              <>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "40px" }}>
                  Minulé udalosti
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                  {past.map((event) => (
                    <Link key={event.id} href={`/udalosti/${event.slug}`}
                      className="group rounded-[15px] overflow-hidden"
                      style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
                      <div className="relative overflow-hidden" style={{ height: "180px", backgroundColor: "#e6ded5" }}>
                        {event.coverImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={event.coverImage} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-300" />
                        )}
                      </div>
                      <div style={{ padding: "16px 20px" }}>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>{event.title}</p>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginTop: "4px" }}>
                          {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
