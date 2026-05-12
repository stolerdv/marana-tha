export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PridajSaTestimonials } from "@/components/pridaj-sa/PridajSaTestimonials";
import { PridajSaForm } from "@/components/pridaj-sa/PridajSaForm";
import Link from "next/link";

export const metadata = {
  title: "Pridaj sa k nám | Marana Tha",
  description: "Chceš sa pridať k spoločenstvu Marana Tha? Vitaj!",
};

const membershipTypes = [
  {
    tag: "Čakateľ",
    color: "#e6ded5",
    textColor: "#635f5b",
    title: "Čakateľ",
    description: "Prvý krok — prídeš, spoznáš ľudí a prežiješ, čo znamená byť súčasťou spoločenstva. Žiadne záväzky, len otvorené dvere.",
    points: [
      "Navštívuješ stretnutia bez záväzkov",
      "Zoznamuješ sa s hodnotami a životom spoločenstva",
      "Spoznávaš ľudí a buduješ priateľstvá",
    ],
  },
  {
    tag: "Sympatizant",
    color: "#bea055",
    textColor: "#fdf5f2",
    title: "Sympatizant",
    description: "Pravidelne prichádzaš, cítiš sa ako súčasť rodiny a chceš sa viac zapojiť. Môžeš slúžiť a aktívne prispievať.",
    points: [
      "Pravidelne sa zúčastňuješ stretnutí",
      "Môžeš sa zapojiť do niektorej zo služieb",
      "Si súčasťou komunity a malých skupín",
    ],
  },
  {
    tag: "Člen",
    color: "#977d3e",
    textColor: "#fdf5f2",
    title: "Člen spoločenstva",
    description: "Plne sa stotožňuješ s víziou a hodnotami Marana Tha. Berieš zodpovednosť za spoločenstvo a spolu ho budujeme.",
    points: [
      "Absolvoval si formačný kurz spoločenstva",
      "Podpisujem záväzok vernosti hodnotám",
      "Aktívne slúžiš a vedeš ostatných",
    ],
  },
];

export default async function PridajSaPage() {
  const pc = await db.pageContent.findUnique({ where: { key: "pridaj-sa" } });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={pc?.title ?? "Pridaj sa k nám"}
          description={pc?.subtitle ?? "Hľadáš spoločenstvo kde môžeš rásť vo viere? Si na správnom mieste. Vitaj u nás."}
          image={pc?.coverImage ?? "/images/pridaj-sa-hero.jpg"}
          titleTop={467}
        />

        {/* Intro */}
        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "0" }}>
          <div className="px-4 sm:px-8 lg:px-[235px]">
            <div className="flex gap-24 items-start">
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "32px" }}>
                  Každý má tu miesto
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "20px", color: "#1c1d1e", lineHeight: "1.75", maxWidth: "560px" }}>
                  Marana Tha je miesto pre každého — bez ohľadu na to, kde sa nachádzaš na svojej duchovnej ceste. Príď taký, aký si. Príjmeme ťa s otvorenou náručou.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                {[{ href: "/spolocenstvo/presov", label: "Prešov" }, { href: "/spolocenstvo/bardejov", label: "Bardejov" }, { href: "/spolocenstvo/kosice", label: "Košice" }].map(c => (
                  <Link key={c.href} href={c.href}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 transition-colors hover:bg-[#977d3e]"
                    style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}>
                    {c.label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3 membership types */}
        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "72px", paddingBottom: "80px" }}>
          <div className="px-4 sm:px-8 lg:px-[235px]">
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
              Ako to funguje
            </p>
            <div className="flex gap-8">
              {membershipTypes.map((type, idx) => (
                <div
                  key={type.tag}
                  style={{
                    flex: 1,
                    backgroundColor: type.color,
                    borderRadius: "15px",
                    padding: "40px 36px",
                    position: "relative",
                  }}
                >
                  {/* Step number */}
                  <div style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "60px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.15)",
                    lineHeight: 1,
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Tag */}
                  <div style={{
                    display: "inline-block",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "50px",
                    padding: "4px 14px",
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: type.textColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "20px",
                  }}>
                    {type.tag}
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: type.textColor,
                    marginBottom: "16px",
                    lineHeight: "1.2",
                  }}>
                    {type.title}
                  </h3>

                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "16px",
                    color: type.textColor,
                    lineHeight: "1.65",
                    marginBottom: "24px",
                    opacity: 0.9,
                  }}>
                    {type.description}
                  </p>

                  <div className="flex flex-col gap-2">
                    {type.points.map((point, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span style={{ color: type.textColor, opacity: 0.7, marginTop: "3px", flexShrink: 0 }}>✓</span>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: type.textColor, opacity: 0.85, lineHeight: "1.5" }}>
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials carousel */}
        <PridajSaTestimonials />

        {/* CTA + Form */}
        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="px-4 sm:px-8 lg:px-[235px]">
            <div className="flex gap-24">
              {/* Left — CTA text */}
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "24px" }}>
                  Urob prvý krok
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", color: "#1c1d1e", lineHeight: "1.75", marginBottom: "32px", maxWidth: "440px" }}>
                  Napíš nám — radi ťa privítame, odpovieme na otázky a pomôžeme ti nájsť to pravé miesto v našom spoločenstve.
                </p>
                <div style={{ borderLeft: "3px solid #bea055", paddingLeft: "20px" }}>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e", marginBottom: "4px" }}>
                    Alebo nás kontaktuj priamo
                  </p>
                  <a href="mailto:info@maranathapo.sk" style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#977d3e" }}>
                    info@maranathapo.sk
                  </a>
                </div>
              </div>

              {/* Right — contact form */}
              <div style={{ width: "480px", flexShrink: 0 }}>
                <PridajSaForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
