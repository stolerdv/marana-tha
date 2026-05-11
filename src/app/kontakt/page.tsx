export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn";

export const metadata = {
  title: "Kontakt | Marana Tha",
  description: "Kontaktné informácie spoločenstva Marana Tha.",
};

export default async function KontaktPage() {
  const pc = await db.pageContent.findUnique({ where: { key: "kontakt" } });
  const d = (pc?.data ?? {}) as Record<string, string>;

  const contacts = [
    { city: "Prešov", address: d.presovAddress ?? "Komunitno-pastoračné centrum sv. Jána Pavla II.\nŠvábska 22, 080 05 Prešov", email: d.presovEmail ?? "info@maranathapo.sk", phone: d.presovPhone ?? "+421 901 234 567" },
    { city: "Bardejov", address: d.bardejovAddress ?? "Bardejov", email: d.bardejovEmail ?? "bardejov@maranathapo.sk", phone: null },
    { city: "Košice", address: d.kosiceAddress ?? "Košice", email: d.kosiceEmail ?? "kosice@maranathapo.sk", phone: null },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero title={pc?.title ?? "Kontakt"} description={pc?.subtitle ?? "Neváhaj nás kontaktovať. Sme tu pre teba."} image={pc?.coverImage ?? "/images/kontakt-hero.jpg"} titleTop={467} />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
            <FadeIn>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "60px" }}>
                Kontakt
              </p>
            </FadeIn>

            <Stagger className="flex flex-col gap-0">
              {contacts.map((c) => (
                <StaggerItem key={c.city}>
                  <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                  <div className="flex items-start py-8 gap-16">
                    <div style={{ width: "200px", flexShrink: 0 }}>
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e" }}>{c.city}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "20px", fontWeight: 300, color: "#1c1d1e", lineHeight: "1.7", whiteSpace: "pre-line" }}>{c.address}</p>
                      {c.email && <a href={`mailto:${c.email}`} style={{ fontFamily: "var(--font-inter)", fontSize: "20px", fontWeight: 300, color: "#977d3e" }}>{c.email}</a>}
                      {c.phone && <a href={`tel:${c.phone}`} style={{ fontFamily: "var(--font-inter)", fontSize: "20px", fontWeight: 300, color: "#1c1d1e" }}>{c.phone}</a>}
                    </div>
                  </div>
                </StaggerItem>
              ))}
              <div style={{ height: "1px", backgroundColor: "#bea055" }} />
            </Stagger>

            <FadeIn delay={0.3}>
              <div className="mt-16">
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "70px", fontWeight: 700, color: "#bea055", lineHeight: "1.1" }}>
                  Neváhaj nás<br />kontaktovať
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
