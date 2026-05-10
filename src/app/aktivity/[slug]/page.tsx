import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";

// Static activity metadata — these are non-DB activities shown in AktivityGrid
const ACTIVITIES: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  schedule?: string;
  contact?: string;
}> = {
  "piatky-mladych": {
    title: "Piatky pre mladých",
    description: "Piatkové stretnutia pre mládež — čas spoločenstva, chvál a rastu vo viere v bezpečnom prostredí.",
    longDescription: "Každý piatok sa stretávame, aby sme spoločne trávili čas v chválach, modlitbe a priateľstve. Je to miesto, kde môžeš byť sám sebou, rásť vo viere a nájsť skutočných priateľov. Stretnutia sú otvorené pre všetkých mladých ľudí.",
    image: "/images/aktivity-hero.jpg",
    schedule: "Každý piatok od 19:00",
  },
  "adoracie": {
    title: "Celonočné adorácie",
    description: "Noc pred Bohom v tichu a adorácii. Osobitný čas modlitby a stretnutia s Ježišom.",
    longDescription: "Celonočné adorácie sú špeciálnym časom, keď sa celé spoločenstvo zbiera v tichosti pred Bohom. Je to čas osobnej modlitby, adorácie Eucharistie a hlbokého spoločenstva s Pánom. Každý je vítaný — môžeš prísť aj len na časť noci.",
    image: "/images/aktivity-hero.jpg",
    schedule: "Pravidelne počas roka",
  },
  "modlitby-uzdravenie": {
    title: "Modlitby za uzdravenie",
    description: "Stretnutia zamerané na modlitbu za uzdravenie duše i tela. Prídi s dôverou, Boh ťa chce uzdraviť.",
    longDescription: "Na stretnutiach modlitby za uzdravenie sa modlíme za uzdravenie duše i tela. Veríme, že Boh stále koná a chce uzdravovať — fyzicky, psychicky aj duchovne. Stretnutia vedú skúsení modlitebníci v prostredí dôvery a lásky.",
    image: "/images/aktivity-hero.jpg",
    schedule: "Mesačne",
  },
  "konferencia-zeny": {
    title: "Ženská konferencia",
    description: "Výročná konferencia pre ženy — čas formovania, sesterstva a sily v kresťanskej ženskosti.",
    longDescription: "Naša ročná ženská konferencia je výnimočným časom pre ženy zo spoločenstva i zvonku. Programom sú prednášky, skupinové rozhovory, chvály a čas na hlbšie zamyslenie. Je to miesto, kde ženy nachádzajú povzbudenie, silu a sesterstvo.",
    image: "/images/aktivity-hero.jpg",
    schedule: "Raz ročne",
  },
  "konferencia-muzi": {
    title: "Mužská konferencia",
    description: "Výročná konferencia pre mužov — rast v kresťanskom mužstve, vodcovstve a bratskej komunite.",
    longDescription: "Mužská konferencia je výzva a povzbudenie pre kresťanských mužov. Spoločne sa zamýšľame nad tým, čo znamená byť mužom podľa Božieho srdca — ako manžel, otec, vodca a brat. Prednášky, skupiny a čas modlitby v mužskej komunite.",
    image: "/images/aktivity-hero.jpg",
    schedule: "Raz ročne",
  },
  "kurzy": {
    title: "Biblické kurzy",
    description: "Formačné kurzy pre tých, ktorí chcú hlbšie spoznať Bibliu, kresťanskú vieru a žiť ju naplno.",
    longDescription: "Naše biblické kurzy sú určené pre každého — od začiatočníkov až po tých, ktorí chcú ísť hlbšie. Kurzy prebiehajú v malých skupinách a pokrývajú témy od základov viery po praktický kresťanský život. Je to bezpečné miesto na otázky, rast a spoločenstvo.",
    image: "/images/aktivity-hero.jpg",
    schedule: "Pravidelne počas roka",
  },
  "misie": {
    title: "Misie",
    description: "Misijné výjazdy a evanjelizačné aktivity — nesi dobrú správu ďalej, doma aj v zahraničí.",
    longDescription: "Misijné aktivity spoločenstva zahŕňajú lokálnu evanjelizáciu, misijné výjazdy na Slovensku i v zahraničí a modlitby za národy. Ak ťa ťahá srdce niesť evanjelium ďalej — toto je tvoje miesto.",
    image: "/images/misie.jpg",
    schedule: "Pravidelne a sezónne",
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

  // Load nearest upcoming events
  const events = await db.event.findMany({
    where: {
      published: true,
      startDate: { gte: new Date() },
    },
    orderBy: { startDate: "asc" },
    take: 3,
    select: { id: true, title: true, slug: true, startDate: true, location: true, isEveningOfPraise: true },
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={activity.title}
          description={activity.description}
          image={activity.image}
          titleTop={467}
        />

        {/* Main content */}
        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
            <div className="flex gap-24">
              {/* Left — main description */}
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "32px" }}>
                  O aktivite
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "20px", color: "#1c1d1e", lineHeight: "1.75", maxWidth: "600px" }}>
                  {activity.longDescription}
                </p>

                {activity.schedule && (
                  <div style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "4px", height: "40px", backgroundColor: "#bea055", borderRadius: "2px", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#977d3e", textTransform: "uppercase", letterSpacing: "0.08em" }}>Termín</p>
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e" }}>{activity.schedule}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right — upcoming events */}
              {events.length > 0 && (
                <div style={{ width: "320px", flexShrink: 0 }}>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "24px", fontWeight: 700, color: "#1c1d1e", marginBottom: "24px" }}>
                    Najbližšie udalosti
                  </p>
                  <div className="flex flex-col">
                    {events.map((event, i) => (
                      <div key={event.id}>
                        {i === 0 && <div style={{ height: "1px", backgroundColor: "#bea055" }} />}
                        <a
                          href={event.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${event.slug}`}
                          className="block py-4 hover:bg-[#f9efe2] transition-colors px-2 -mx-2 rounded-[8px]"
                        >
                          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>{event.title}</p>
                          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#635f5b", marginTop: "2px" }}>
                            {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}
                            {event.location && ` · ${event.location}`}
                          </p>
                        </a>
                        <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact CTA */}
            <div style={{ marginTop: "64px", padding: "40px", backgroundColor: "#ffffff", borderRadius: "15px" }}>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", marginBottom: "8px" }}>
                Záujem o túto aktivitu?
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginBottom: "24px" }}>
                Napíš nám a radi ťa uvítame.
              </p>
              <a
                href="mailto:info@maranathapo.sk"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#bea055",
                  borderRadius: "50px",
                  padding: "14px 32px",
                  fontFamily: "var(--font-commissioner)",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#fdf5f2",
                }}
              >
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
