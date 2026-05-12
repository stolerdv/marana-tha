import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

export const metadata = {
  title: "Podpora | Marana Tha",
  description: "Podpor spoločenstvo Marana Tha. Každý príspevok pomáha budovať komunitu viery.",
};

const ways = [
  {
    title: "Bankový prevod",
    description: "Pravidelná alebo jednorazová podpora priamo na účet spoločenstva.",
    detail: "IBAN: SK00 0000 0000 0000 0000 0000",
    note: "Do poznámky uveď: Podpora Marana Tha",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    title: "PayPal",
    description: "Rýchle a bezpečné online platby cez PayPal.",
    detail: "podpora@maranathapo.sk",
    note: "Klikni na tlačidlo nižšie",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 11C7 11 6 17 13 17H16C19 17 21 15 21 12C21 9 19 7 16 7H7L6 13" />
        <path d="M4 7C4 7 3 13 10 13H13" />
      </svg>
    ),
  },
  {
    title: "Zbierky a akcie",
    description: "Zapoj sa do našich zbierok počas udalostí alebo špeciálnych kampaní.",
    detail: "Sleduj naše udalosti",
    note: "Oznámime na stretnutiach a sociálnych sieťach",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function PodporaPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Podpora"
          description="Tvoja podpora pomáha budovať spoločenstvo, financovať aktivity a slúžiť ľuďom v núdzi."
          image="/images/hero-bg.jpg"
          titleTop={467}
        />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="px-4 sm:px-8 lg:px-[235px]">

            {/* Intro */}
            <div style={{ maxWidth: "700px", marginBottom: "48px" }}>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(32px,4vw,50px)", fontWeight: 400, lineHeight: 1.2, color: "#977d3e", marginBottom: "20px" }}>
                Prečo podporiť
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(16px,2vw,20px)", color: "#1c1d1e", lineHeight: "1.75" }}>
                Spoločenstvo Marana Tha je financované výlučne z dobrovoľných príspevkov svojich členov a priaznivcov. Každý dar — veľký či malý — pomáha pokryť náklady na priestory, organizáciu podujatí, hudobnú a produkčnú službu a misijné aktivity.
              </p>
            </div>

            {/* 3 ways — stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-6" style={{ marginBottom: "48px" }}>
              {ways.map((w, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "clamp(24px,3vw,36px) clamp(20px,3vw,32px)", border: "1px solid #e4d5b2" }}>
                  <div style={{ color: "#bea055", marginBottom: "16px" }}>{w.icon}</div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e", marginBottom: "8px" }}>
                    {w.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#635f5b", lineHeight: "1.6", marginBottom: "16px" }}>
                    {w.description}
                  </p>
                  <div style={{ height: "1px", backgroundColor: "#e4d5b2", marginBottom: "12px" }} />
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#1c1d1e", marginBottom: "4px" }}>
                    {w.detail}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#977d3e" }}>
                    {w.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={{ backgroundColor: "#977d3e", borderRadius: "15px", padding: "clamp(28px,4vw,56px) clamp(24px,5vw,64px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "8px", left: "24px", fontFamily: "Georgia, serif", fontSize: "clamp(60px,10vw,120px)", color: "rgba(255,255,255,0.1)", lineHeight: 1, pointerEvents: "none" }}>
                "
              </div>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 400, color: "#fdf5f2", lineHeight: "1.6", maxWidth: "680px", position: "relative" }}>
                Každý nech dáva, ako si umienil v srdci, nie so zármutkom alebo z donútenia, lebo Boh miluje ochotného darcu.
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "rgba(253,245,242,0.6)", marginTop: "16px" }}>
                2. Korinťanom 9:7
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
