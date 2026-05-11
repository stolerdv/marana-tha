export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { TestimonialsCarousel } from "@/components/shared/TestimonialsCarousel";
import { AddToCalendar } from "@/components/udalosti/AddToCalendar";
import Link from "next/link";

const ACTIVITIES: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  schedule?: string;
  gallery: string[];
  testimonials: { quote: string; name: string; role: string; photo?: string }[];
}> = {
  "piatky-mladych": {
    title: "Piatky pre mladých",
    description: "Piatkové stretnutia pre mládež — čas spoločenstva, chvál a rastu vo viere v bezpečnom prostredí.",
    longDescription: "Každý piatok sa stretávame, aby sme spoločne trávili čas v chválach, modlitbe a priateľstve. Je to miesto, kde môžeš byť sám sebou, rásť vo viere a nájsť skutočných priateľov. Stretnutia sú otvorené pre všetkých mladých ľudí.",
    image: "/images/sluzba-mladym.jpg",
    schedule: "Každý piatok od 19:00",
    gallery: ["/images/sluzba-mladym.jpg", "/images/o-nas-1.jpg", "/images/vecer-chval-hero.jpg"],
    testimonials: [
      { quote: "Na piatkovom stretnutí som po prvýkrát cítil, že som súčasťou niečoho väčšieho. Ľudia tu sú úprimní a prijímajú ťa takého, aký si.", name: "Tomáš", role: "Pravidelný účastník", photo: "/images/o-nas-testimonial-person.jpg" },
      { quote: "Najlepšie piatky v týždni. Prichádzam tu nabiť sa energiou, nájsť priateľov a stretnúť Boha.", name: "Zuzka", role: "Členka spoločenstva", photo: "/images/o-nas-testimonial-2.jpg" },
    ],
  },
  "adoracie": {
    title: "Celonočné adorácie",
    description: "Noc pred Bohom v tichu a adorácii. Osobitný čas modlitby a stretnutia s Ježišom.",
    longDescription: "Celonočné adorácie sú špeciálnym časom, keď sa celé spoločenstvo zbiera v tichosti pred Bohom. Je to čas osobnej modlitby, adorácie Eucharistie a hlbokého spoločenstva s Pánom. Každý je vítaný — môžeš prísť aj len na časť noci.",
    image: "/images/sluzba-modlitby.jpg",
    schedule: "Pravidelne počas roka",
    gallery: ["/images/sluzba-modlitby.jpg", "/images/o-nas-2.jpg"],
    testimonials: [
      { quote: "Celonočná adorácia zmenila môj pohľad na modlitbu. V tichu som počul Boha spôsobom, aký som pred tým nepoznal.", name: "Mária", role: "Členka spoločenstva", photo: "/images/o-nas-testimonial-2.jpg" },
    ],
  },
  "modlitby-uzdravenie": {
    title: "Modlitby za uzdravenie",
    description: "Stretnutia zamerané na modlitbu za uzdravenie duše i tela. Prídi s dôverou, Boh ťa chce uzdraviť.",
    longDescription: "Na stretnutiach modlitby za uzdravenie sa modlíme za uzdravenie duše i tela. Veríme, že Boh stále koná a chce uzdravovať — fyzicky, psychicky aj duchovne. Stretnutia vedú skúsení modlitebníci v prostredí dôvery a lásky.",
    image: "/images/o-nas-1.jpg",
    schedule: "Mesačne",
    gallery: ["/images/o-nas-1.jpg", "/images/o-nas-photo-1.jpg", "/images/o-nas-photo-2.jpg"],
    testimonials: [
      { quote: "Prišiel som so zlomeným srdcom a odišiel som s pokojom, ktorý som dlho nemal. Boh koná aj dnes.", name: "Ján", role: "Návštevník", photo: "/images/o-nas-testimonial-person.jpg" },
    ],
  },
  "konferencia-zeny": {
    title: "Ženská konferencia",
    description: "Výročná konferencia pre ženy — čas formovania, sesterstva a sily v kresťanskej ženskosti.",
    longDescription: "Naša ročná ženská konferencia je výnimočným časom pre ženy zo spoločenstva i zvonku. Programom sú prednášky, skupinové rozhovory, chvály a čas na hlbšie zamyslenie. Je to miesto, kde ženy nachádzajú povzbudenie, silu a sesterstvo.",
    image: "/images/sluzba-zenam.jpg",
    schedule: "Raz ročne",
    gallery: ["/images/sluzba-zenam.jpg", "/images/o-nas-svedectva.jpg"],
    testimonials: [
      { quote: "Ženská konferencia mi dala odvahu byť ženou, akou ma Boh stvoril. Odišla som transformovaná.", name: "Andrea", role: "Účastníčka 3. ročníka", photo: "/images/o-nas-testimonial-2.jpg" },
    ],
  },
  "konferencia-muzi": {
    title: "Mužská konferencia",
    description: "Výročná konferencia pre mužov — rast v kresťanskom mužstve, vodcovstve a bratskej komunite.",
    longDescription: "Mužská konferencia je výzva a povzbudenie pre kresťanských mužov. Spoločne sa zamýšľame nad tým, čo znamená byť mužom podľa Božieho srdca — ako manžel, otec, vodca a brat. Prednášky, skupiny a čas modlitby v mužskej komunite.",
    image: "/images/sluzba-muzom.jpg",
    schedule: "Raz ročne",
    gallery: ["/images/sluzba-muzom.jpg", "/images/o-nas-1.jpg"],
    testimonials: [
      { quote: "Nikdy predtým som nebol v priestore, kde muži otvorene hovorili o svojom srdci a Bohu. Mužská konferencia to zmenila.", name: "Rastislav", role: "Člen spoločenstva", photo: "/images/o-nas-testimonial-person.jpg" },
    ],
  },
  "kurzy": {
    title: "Biblické kurzy",
    description: "Formačné kurzy pre tých, ktorí chcú hlbšie spoznať Bibliu, kresťanskú vieru a žiť ju naplno.",
    longDescription: "Naše biblické kurzy sú určené pre každého — od začiatočníkov až po tých, ktorí chcú ísť hlbšie. Kurzy prebiehajú v malých skupinách a pokrývajú témy od základov viery po praktický kresťanský život. Je to bezpečné miesto na otázky, rast a spoločenstvo.",
    image: "/images/aktivity-hero.jpg",
    schedule: "Pravidelne počas roka",
    gallery: ["/images/aktivity-hero.jpg", "/images/o-nas-2.jpg"],
    testimonials: [
      { quote: "Kurz ma naučil čítať Bibliu spôsobom, ktorý mi zmenil každodenný život. Odporúčam každému.", name: "Katarína", role: "Absolventka kurzu", photo: "/images/o-nas-testimonial-2.jpg" },
    ],
  },
  "misie": {
    title: "Misie",
    description: "Misijné výjazdy a evanjelizačné aktivity — nesi dobrú správu ďalej, doma aj v zahraničí.",
    longDescription: "Misijné aktivity spoločenstva zahŕňajú lokálnu evanjelizáciu, misijné výjazdy na Slovensku i v zahraničí a modlitby za národy. Ak ťa ťahá srdce niesť evanjelium ďalej — toto je tvoje miesto.",
    image: "/images/misie.jpg",
    schedule: "Pravidelne a sezónne",
    gallery: ["/images/misie.jpg", "/images/o-nas-photo-1.jpg"],
    testimonials: [
      { quote: "Misijný výjazd bol najvýznamnejší zážitok môjho kresťanského života. Videl som Boha konať v iných kultúrach.", name: "Michal", role: "Misijník", photo: "/images/o-nas-testimonial-person.jpg" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = ACTIVITIES[slug];
  if (!activity) return { title: "Marana Tha" };
  return { title: `${activity.title} | Marana Tha`, description: activity.description };
}

export default async function AktivitaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = ACTIVITIES[slug];
  if (!activity) notFound();

  const events = await db.event.findMany({
    where: { published: true, startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    take: 5,
    select: { id: true, title: true, slug: true, startDate: true, endDate: true, location: true, isEveningOfPraise: true, description: true },
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHero title={activity.title} description={activity.description} image={activity.image} titleTop={467} />

        {/* 1. INTRO */}
        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "72px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "32px" }}>
              O aktivite
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "20px", color: "#1c1d1e", lineHeight: "1.75", maxWidth: "720px", marginBottom: activity.schedule ? "40px" : "0" }}>
              {activity.longDescription}
            </p>
            {activity.schedule && (
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "4px", height: "48px", backgroundColor: "#bea055", borderRadius: "2px", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#977d3e", textTransform: "uppercase", letterSpacing: "0.08em" }}>Termín</p>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "22px", fontWeight: 700, color: "#1c1d1e" }}>{activity.schedule}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 2. GALÉRIA */}
        {activity.gallery.length > 0 && (
          <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "72px" }}>
            <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "36px", fontWeight: 400, color: "#977d3e", marginBottom: "24px" }}>
                Galéria
              </p>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(activity.gallery.length, 3)}, 1fr)`, gap: "12px" }}>
                {activity.gallery.map((src, i) => (
                  <div key={i} style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3", backgroundColor: "#e6ded5", position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${activity.title} ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. SVEDECTVÁ */}
        {activity.testimonials.length > 0 && (
          <TestimonialsCarousel testimonials={activity.testimonials} title="Skúsenosti ľudí" />
        )}

        {/* 4. NAJBLIŽŠIE — calendar style */}
        {events.length > 0 && (
          <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "80px" }}>
            <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "40px" }}>
                Najbližšie udalosti
              </p>
              <div className="flex flex-col">
                {events.map((event, i) => (
                  <div key={event.id}>
                    {i === 0 && <div style={{ height: "1px", backgroundColor: "#bea055" }} />}
                    <div className="flex items-center py-5 gap-6">
                      {/* Big date */}
                      <div style={{ width: "56px", flexShrink: 0, textAlign: "center" }}>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "34px", fontWeight: 700, color: "#bea055", lineHeight: 1 }}>
                          {new Date(event.startDate).getDate()}
                        </p>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", color: "#977d3e", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {new Date(event.startDate).toLocaleString("sk-SK", { month: "short" })}
                        </p>
                      </div>
                      <div style={{ width: "1px", height: "44px", backgroundColor: "#e4d5b2", flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <Link href={event.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${event.slug}`} className="hover:underline">
                          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e" }}>{event.title}</p>
                        </Link>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#635f5b", marginTop: "2px" }}>
                          {new Date(event.startDate).toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                          {event.location && ` · ${event.location}`}
                        </p>
                      </div>
                      <AddToCalendar
                        eventId={event.id}
                        title={event.title}
                        description={event.description}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        location={event.location}
                      />
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                  </div>
                ))}
              </div>
              <Link href="/udalosti" style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#977d3e", display: "inline-block", marginTop: "20px" }}>
                Všetky udalosti →
              </Link>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "48px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", marginBottom: "8px" }}>
                  Záujem o túto aktivitu?
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b" }}>Napíš nám a radi ťa uvítame.</p>
              </div>
              <a href="mailto:info@maranathapo.sk"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#bea055", borderRadius: "50px", padding: "16px 36px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", flexShrink: 0 }}>
                Kontaktovať nás →
              </a>
            </div>
          </div>
        </section>

        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
