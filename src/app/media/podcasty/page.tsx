import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";

export const metadata = {
  title: "Podcasty | Marana Tha",
  description: "Počúvaj kázne, svedectvá a duchovné zamyslenia zo spoločenstva Marana Tha.",
};

const platforms = [
  {
    name: "Spotify",
    href: "#",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Podcasts",
    href: "#",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm7.952 4.8c2.164.0 4.219.874 5.715 2.38 1.497 1.513 2.345 3.54 2.344 5.622 0 3.295-1.9 6.175-4.793 7.54.15-1.101-.42-2.07-1.27-2.7-.72-.523-1.62-.78-2.52-.78h-.038c-.9 0-1.8.257-2.52.78-.85.63-1.42 1.599-1.27 2.7-2.893-1.365-4.793-4.245-4.793-7.54 0-4.42 3.54-7.985 8.07-8.002h.075zm-.004 2.14a5.07 5.07 0 00-5.07 5.064 5.07 5.07 0 005.07 5.063 5.07 5.07 0 005.07-5.063 5.07 5.07 0 00-5.07-5.063zm0 1.74a3.33 3.33 0 013.33 3.324 3.33 3.33 0 01-3.33 3.324 3.33 3.33 0 01-3.33-3.324 3.33 3.33 0 013.33-3.324zm0 1.59a1.74 1.74 0 00-1.74 1.734 1.74 1.74 0 001.74 1.733 1.74 1.74 0 001.74-1.733 1.74 1.74 0 00-1.74-1.734z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

export default function PodcastyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Podcasty"
          description="Počúvaj kázne, svedectvá a duchovné zamyslenia zo spoločenstva Marana Tha."
          image="/images/hero-bg.jpg"
          titleTop={467}
        />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "24px" }}>
              Naše podcasty
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "20px", color: "#635f5b", lineHeight: "1.7", maxWidth: "660px", marginBottom: "56px" }}>
              Poslúchaj kázne, svedectvá a duchovné zamyslenia z našich stretnutí. Dostupné na všetkých hlavných platformách.
            </p>

            {/* Platform links */}
            <div className="flex gap-6" style={{ marginBottom: "72px" }}>
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "16px 28px",
                    color: "#1c1d1e",
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  <span style={{ color: "#977d3e" }}>{p.icon}</span>
                  {p.name}
                </a>
              ))}
            </div>

            {/* Coming soon placeholder */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "60px", textAlign: "center", maxWidth: "600px" }}>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", marginBottom: "12px" }}>
                Čoskoro
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", lineHeight: "1.6" }}>
                Naše podcasty sú v príprave. Sledujte nás na sociálnych sieťach alebo sa prihláste na odber noviniek.
              </p>
            </div>
          </div>
        </section>

        <ZistitViac />
      </main>
      <Footer />
    </>
  );
}
