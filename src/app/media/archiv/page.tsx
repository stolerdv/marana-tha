export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";

export const metadata = {
  title: "Archív | Marana Tha",
  description: "Záznamy a videá zo stretnutí a udalostí spoločenstva Marana Tha.",
};

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default async function ArchivPage() {
  const videos = await db.video.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Archív"
          description="Záznamy zo stretnutí, konferencií a špeciálnych udalostí spoločenstva Marana Tha."
          image="/images/archiv.jpg"
          titleTop={467}
        />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
              Záznamy
            </p>

            {videos.length === 0 ? (
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>
                Záznamy budú čoskoro pridané.
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
                {videos.map((video) => {
                  const ytId = getYouTubeId(video.youtubeUrl);
                  const thumb = video.thumbnail ?? (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);
                  return (
                    <a
                      key={video.id}
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      style={{ borderRadius: "15px", overflow: "hidden", backgroundColor: "#ffffff", display: "block" }}
                    >
                      <div className="relative overflow-hidden" style={{ height: "200px", backgroundColor: "#1c1d1e" }}>
                        {thumb && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-300 opacity-80" />
                        )}
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(190,160,85,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                              <path d="M7 4l10 6-10 6V4z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: "16px 20px 20px" }}>
                        <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e", lineHeight: "1.3" }}>
                          {video.title}
                        </h3>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <ZistitViac />
      </main>
      <Footer />
    </>
  );
}
