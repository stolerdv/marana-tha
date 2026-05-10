import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { RegistrationForm } from "@/components/udalosti/RegistrationForm";
import { AddToCalendar } from "@/components/udalosti/AddToCalendar";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await db.event.findUnique({ where: { slug, published: true }, select: { title: true, description: true } });
  if (!event) return { title: "Marana Tha" };
  return { title: `${event.title} | Marana Tha`, description: event.description };
}

function formatDate(d: Date, withTime = true) {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  if (withTime) { opts.hour = "2-digit"; opts.minute = "2-digit"; }
  return new Date(d).toLocaleDateString("sk-SK", opts);
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await db.event.findUnique({ where: { slug, published: true } });
  if (!event) notFound();

  // Parse formFields JSON — cast type to the union (values are always valid, stored by FormBuilder)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formFields = (event.formFields as any[]) ?? [];

  return (
    <>
      <Navbar />
      <main>
        <PageHero title={event.title} description={event.description} image={event.coverImage ?? "/images/default-event-hero.jpg"} titleTop={467} />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

            {/* Meta row */}
            <div className="flex items-start gap-10 rounded-[15px] p-8 mb-10"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
              <div>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Dátum</p>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e" }}>{formatDate(event.startDate)}</p>
                {event.endDate && <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "#635f5b" }}>do {formatDate(event.endDate)}</p>}
              </div>

              {event.location && (
                <>
                  <div style={{ width: "1px", backgroundColor: "#e4d5b2", alignSelf: "stretch" }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Miesto</p>
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e" }}>{event.location}</p>
                  </div>
                </>
              )}

              <div className="ml-auto flex items-center gap-4">
                <AddToCalendar
                  eventId={event.id}
                  title={event.title}
                  description={event.description}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  location={event.location}
                />
                {event.hasForm && (
                  <a href="#registracia" className="inline-flex items-center gap-2 rounded-full px-8 py-3 transition-colors hover:bg-[#977d3e]"
                    style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}>
                    Registrovať sa →
                  </a>
                )}
              </div>
            </div>

            {/* Rich content */}
            {event.content && (
              <div
                className="prose max-w-none mb-16"
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#1c1d1e", lineHeight: "1.6" }}
                dangerouslySetInnerHTML={{ __html: event.content }}
              />
            )}

            {/* Registration form */}
            {event.hasForm && formFields.length > 0 && (
              <div id="registracia">
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "40px" }}>
                  Registrácia
                </p>
                <RegistrationForm eventId={event.id} fields={formFields} />
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
