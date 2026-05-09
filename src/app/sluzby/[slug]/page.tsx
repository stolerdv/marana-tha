import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = await db.ministry.findUnique({ where: { slug, published: true }, select: { title: true, description: true } });
  if (!ministry) return { title: "Marana Tha" };
  return { title: `${ministry.title} | Marana Tha`, description: ministry.description };
}

export default async function SluzbaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = await db.ministry.findUnique({
    where: { slug, published: true },
    include: {
      people: {
        where: { published: true },
        orderBy: { order: "asc" },
        select: { id: true, name: true, role: true, photo: true },
      },
    },
  });
  if (!ministry) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={ministry.title}
          description={ministry.description}
          image={ministry.coverImage ?? "/images/sluzby-hero.jpg"}
          titleTop={467}
        />

        {/* Content section */}
        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

            {/* Rich text content */}
            {ministry.content && (
              <div
                className="prose max-w-none mb-16"
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#1c1d1e", lineHeight: "1.6" }}
                dangerouslySetInnerHTML={{ __html: ministry.content }}
              />
            )}

            {/* People in this ministry */}
            {ministry.people.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", marginBottom: "32px" }}>
                  Tím služby
                </h2>
                <div className="flex flex-wrap gap-8">
                  {ministry.people.map((person) => (
                    <div key={person.id} className="flex flex-col items-start" style={{ width: "174px" }}>
                      <div className="relative overflow-hidden" style={{ width: "174px", height: "198px", borderRadius: "15px", backgroundColor: "#e6ded5" }}>
                        {person.photo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={person.photo} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </div>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 400, color: "#1c1d1e", marginTop: "12px" }}>{person.name}</p>
                      {person.role && <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#977d3e", marginTop: "2px" }}>{person.role}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
