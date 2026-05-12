import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import Link from "next/link";

export const metadata = {
  title: "Vstup pre členov | Marana Tha",
  description: "Členská zóna spoločenstva Marana Tha.",
};

const resources = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: "Dokumenty a materiály",
    description: "Formačné materiály, bulletiny a ďalšie dokumenty spoločenstva.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
      </svg>
    ),
    title: "Interný kalendár",
    description: "Plán stretnutí, nácvikov a interných podujatí.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Adresár členov",
    description: "Kontakty na členov a vedúcich jednotlivých služieb.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" strokeLinecap="round" />
      </svg>
    ),
    title: "Záznamy zo stretnutí",
    description: "Archív zápisníc a materiálov z vedúcich stretnutí.",
  },
];

export default function VstupPreClenovPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Vstup pre členov"
          description="Privátna zóna pre členov spoločenstva Marana Tha."
          image="/images/hero-bg.jpg"
          titleTop={467}
        />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="px-4 sm:px-8 lg:px-[235px]">

            {/* Login card */}
            <div style={{ display: "flex", gap: "80px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "24px" }}>
                  Členská zóna
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", color: "#635f5b", lineHeight: "1.75", marginBottom: "40px", maxWidth: "500px" }}>
                  Táto sekcia je určená pre členov a sympatizantov spoločenstva. Nájdeš tu interné materiály, kalendár a ďalšie zdroje.
                </p>

                {/* Resources grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  {resources.map((r, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e4d5b2" }}
                    >
                      <div style={{ color: "#bea055", marginBottom: "12px" }}>{r.icon}</div>
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e", marginBottom: "6px" }}>
                        {r.title}
                      </p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b", lineHeight: "1.5" }}>
                        {r.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Login box */}
              <div style={{ width: "380px", flexShrink: 0 }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "40px", border: "1px solid #e4d5b2" }}>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "26px", fontWeight: 700, color: "#1c1d1e", marginBottom: "8px" }}>
                    Prihlás sa
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b", marginBottom: "28px" }}>
                    Prístup majú iba členovia spoločenstva.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
                        E-mail
                      </label>
                      <input
                        type="email"
                        disabled
                        placeholder="jan@email.sk"
                        style={{ width: "100%", height: "48px", borderRadius: "10px", border: "1px solid #e4d5b2", padding: "0 16px", fontFamily: "var(--font-inter)", fontSize: "15px", color: "#1c1d1e", backgroundColor: "#f9f6f2", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
                        Heslo
                      </label>
                      <input
                        type="password"
                        disabled
                        placeholder="••••••••"
                        style={{ width: "100%", height: "48px", borderRadius: "10px", border: "1px solid #e4d5b2", padding: "0 16px", fontFamily: "var(--font-inter)", fontSize: "15px", color: "#1c1d1e", backgroundColor: "#f9f6f2", boxSizing: "border-box" }}
                      />
                    </div>

                    {/* Coming soon notice */}
                    <div style={{ backgroundColor: "#fdf5f2", borderRadius: "10px", padding: "14px 16px", border: "1px solid #e4d5b2" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#977d3e", lineHeight: "1.5" }}>
                        🔒 Členská zóna je v príprave. Prístup bude dostupný čoskoro.
                      </p>
                    </div>

                    <button
                      disabled
                      style={{ width: "100%", height: "50px", borderRadius: "50px", backgroundColor: "#c9a96e", border: "none", fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#fdf5f2", cursor: "not-allowed", opacity: 0.7 }}
                    >
                      Prihlásiť sa
                    </button>
                  </div>

                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginTop: "20px", textAlign: "center" }}>
                    Nie si člen?{" "}
                    <Link href="/pridaj-sa" style={{ color: "#977d3e", fontWeight: 600 }}>
                      Pridaj sa k nám
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
