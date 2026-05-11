export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { AddToCalendar } from "@/components/udalosti/AddToCalendar";
import { CityBadge } from "@/components/shared/CityBadge";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = await db.ministry.findUnique({ where: { slug, published: true }, select: { title: true, description: true } });
  if (!ministry) return { title: "Marana Tha" };
  return { title: `${ministry.title} | Marana Tha`, description: ministry.description };
}

export default async function SluzbaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [ministry, upcomingEvents] = await Promise.all([
    db.ministry.findUnique({
      where: { slug, published: true },
      include: {
        people: { where: { published: true }, orderBy: { order: "asc" }, select: { id: true, name: true, role: true, photo: true } },
        galleries: { where: { published: true }, include: { photos: { orderBy: { order: "asc" } } }, take: 1 },
      },
    }),
    db.event.findMany({
      where: { published: true, startDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
      take: 4,
      select: { id: true, title: true, slug: true, startDate: true, endDate: true, location: true, isEveningOfPraise: true, description: true },
    }),
  ]);

  if (!ministry) notFound();

  const contactPerson = ministry.people[0] ?? null;
  const galleryPhotos = ministry.galleries[0]?.photos ?? [];

  return (
    <>
      <Navbar />
      <main>
        <PageHero title={ministry.title} description={ministry.description} image={ministry.coverImage ?? "/images/sluzby-hero.jpg"} titleTop={467} />

        {/* O službe */}
        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
            <div className="flex gap-20 items-start">
              <div style={{ flex: 1 }}>
                <FadeIn>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "32px" }}>
                    O službe
                  </p>
                  {ministry.content ? (
                    <div className="prose max-w-none" style={{ fontFamily: "var(--font-inter)", fontSize: "18px", color: "#1c1d1e", lineHeight: "1.75" }} dangerouslySetInnerHTML={{ __html: ministry.content }} />
                  ) : (
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", color: "#635f5b", lineHeight: "1.75" }}>{ministry.description}</p>
                  )}
                </FadeIn>
              </div>

              {contactPerson && (
                <FadeIn delay={0.15} style={{ width: "280px", flexShrink: 0 }}>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e", marginBottom: "20px" }}>Zodpovedná osoba</p>
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "24px", border: "1px solid #e4d5b2" }}>
                    <div className="flex items-start gap-4">
                      <div style={{ width: "72px", height: "72px", borderRadius: "12px", backgroundColor: "#e6ded5", flexShrink: 0, overflow: "hidden" }}>
                        {contactPerson.photo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={contactPerson.photo} alt={contactPerson.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>{contactPerson.name}</p>
                        {contactPerson.role && <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#977d3e", marginTop: "2px" }}>{contactPerson.role}</p>}
                      </div>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#e4d5b2", margin: "16px 0" }} />
                    <a href="mailto:info@maranathapo.sk" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#977d3e", display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      info@maranathapo.sk
                    </a>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>

        {/* Tím služby */}
        {ministry.people.length > 0 && (
          <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "80px" }}>
            <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
              <div style={{ height: "1px", backgroundColor: "#e4d5b2", marginBottom: "60px" }} />
              <FadeIn>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "36px", fontWeight: 700, color: "#1c1d1e", marginBottom: "36px" }}>Tím služby</p>
              </FadeIn>
              <Stagger className="flex flex-wrap gap-8">
                {ministry.people.map((person) => (
                  <StaggerItem key={person.id}>
                    <div className="flex flex-col items-start" style={{ width: "174px" }}>
                      <div className="relative overflow-hidden" style={{ width: "174px", height: "198px", borderRadius: "15px", backgroundColor: "#e6ded5" }}>
                        {person.photo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={person.photo} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                        )}
                      </div>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 400, color: "#1c1d1e", marginTop: "12px" }}>{person.name}</p>
                      {person.role && <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#977d3e", marginTop: "2px" }}>{person.role}</p>}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* Galéria */}
        {galleryPhotos.length > 0 && (
          <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "80px" }}>
            <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
              <div style={{ height: "1px", backgroundColor: "#e4d5b2", marginBottom: "60px" }} />
              <FadeIn>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "36px", fontWeight: 400, color: "#977d3e", marginBottom: "24px" }}>Galéria</p>
              </FadeIn>
              <Stagger style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(galleryPhotos.length, 3)}, 1fr)`, gap: "12px" }}>
                {galleryPhotos.map((photo, i) => (
                  <StaggerItem key={photo.id}>
                    <div style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3", backgroundColor: "#e6ded5" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.url} alt={photo.alt ?? `Foto ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* Najbližšie udalosti */}
        {upcomingEvents.length > 0 && (
          <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "80px" }}>
            <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
              <div style={{ height: "1px", backgroundColor: "#e4d5b2", marginBottom: "60px" }} />
              <FadeIn>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "40px" }}>
                  Najbližšie udalosti
                </p>
              </FadeIn>
              <div className="flex flex-col" style={{ marginBottom: "32px" }}>
                {upcomingEvents.map((event) => (
                  <FadeIn key={event.id}>
                    <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                    <div className="flex items-center py-5 gap-6">
                      <div style={{ flex: 1 }}>
                        <Link href={event.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${event.slug}`} className="hover:underline">
                          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "24px", fontWeight: 700, color: "#1c1d1e" }}>{event.title}</p>
                        </Link>
                        <div className="flex items-center gap-2 flex-wrap" style={{ marginTop: "4px" }}>
                          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "#635f5b" }}>
                            {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </p>
                          {event.location && <CityBadge city={event.location} />}
                        </div>
                      </div>
                      <AddToCalendar eventId={event.id} title={event.title} description={event.description} startDate={event.startDate} endDate={event.endDate} location={event.location} />
                    </div>
                  </FadeIn>
                ))}
                <div style={{ height: "1px", backgroundColor: "#bea055" }} />
              </div>
              <Link href="/udalosti" style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#977d3e" }}>Všetky udalosti →</Link>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
            <FadeIn>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "48px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", marginBottom: "8px" }}>Chceš sa zapojiť?</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b" }}>Napíš nám a radi ťa uvítame v tejto službe.</p>
                </div>
                <Link href="/pridaj-sa" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#bea055", borderRadius: "50px", padding: "16px 36px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", flexShrink: 0 }}>
                  Pridaj sa →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
