import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import Link from "next/link";

export const metadata = {
  title: "Pridaj sa k nám | Marana Tha",
  description: "Chceš sa pridať k spoločenstvu Marana Tha? Vitaj!",
};

const steps = [
  { number: "01", title: "Príď na stretnutie", description: "Navštív niektoré z našich pravidelných stretnutí — večer chvál, piatkové stretnutia mládeže alebo adorácie. Vitajú všetci." },
  { number: "02", title: "Spoznaj ľudí", description: "Každý začína ako nový. Naši ľudia ťa privítajú s otvorenou náručou. Nájdeš tu priateľov na celý život." },
  { number: "03", title: "Zapoj sa", description: "Keď sa budeš cítiť doma, môžeš sa zapojiť do niektorej zo služieb alebo malých skupiniek. Každý má miesto." },
];

export default function PridajSaPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Pridaj sa k nám" description="Hľadáš spoločenstvo kde môžeš rásť vo viere? Si na správnom mieste. Vitaj u nás." image="/images/pridaj-sa-hero.jpg" titleTop={467} />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "60px" }}>
              Ako začať
            </p>

            <div className="flex flex-col gap-0">
              {steps.map((step, i) => (
                <div key={step.number}>
                  <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                  <div className="flex items-start py-8 gap-16">
                    <div style={{ width: "80px", flexShrink: 0 }}>
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "40px", fontWeight: 700, color: "#bea055", lineHeight: 1 }}>{step.number}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", marginBottom: "8px" }}>{step.title}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 400, color: "#292929", lineHeight: "1.7", maxWidth: "600px" }}>{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ height: "1px", backgroundColor: "#bea055" }} />
            </div>

            {/* CTA section */}
            <div className="mt-16 flex gap-8 items-center">
              <div>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "40px", fontWeight: 700, color: "#1c1d1e", marginBottom: "16px" }}>
                  Nájdi stretnutie vo tvojom meste
                </p>
                <div className="flex gap-4">
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

            {/* Contact */}
            <div className="mt-12" style={{ borderTop: "1px solid #e4d5b2", paddingTop: "40px" }}>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>
                Máš otázky? Napíš nám na{" "}
                <a href="mailto:info@maranathapo.sk" style={{ color: "#977d3e" }}>info@maranathapo.sk</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
