"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ArchivVideo {
  id: string;
  title: string;
  youtubeUrl: string;
}

interface Props {
  videos?: ArchivVideo[];
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function ArchivSection({ videos = [] }: Props) {
  const featured = videos[0] ?? null;
  const thumbnails = videos.slice(1, 5);
  const featuredId = featured ? getYouTubeId(featured.youtubeUrl) : null;
  const featuredThumb = featuredId
    ? `https://img.youtube.com/vi/${featuredId}/maxresdefault.jpg`
    : "/images/archiv.jpg";

  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden">
      <div className="max-w-[1512px] mx-auto">

        {/* Watermark */}
        <div className="relative flex justify-center pointer-events-none select-none pt-12 px-4 sm:px-8 lg:px-[235px]">
          <div style={{ fontSize: "100px", fontFamily: "var(--font-commissioner)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", letterSpacing: "-2px", whiteSpace: "nowrap" }}>
            ARCHÍV
          </div>
        </div>

        {/* Section heading */}
        <div className="relative text-center -mt-14 mb-6 pointer-events-none px-4 sm:px-8 lg:px-[235px]">
          <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, color: "var(--color-gold-dark)" }}>
            archív
          </span>
        </div>

        {/* Featured video */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(240px, 45vw, 656px)" }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${featuredThumb}')` }} />
          <div className="absolute inset-0 bg-black/40" />

          {/* Play button */}
          {featured ? (
            <a
              href={featured.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-5 group"
            >
              <div
                className="rounded-full border-2 flex items-center justify-center group-hover:bg-white/20 transition-all"
                style={{ width: "98px", height: "98px", borderColor: "var(--color-cream-light)" }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M10 6L26 16L10 26V6Z" fill="var(--color-cream-light)" />
                </svg>
              </div>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "rgba(253,245,242,0.85)" }}>
                {featured.title}
              </p>
            </a>
          ) : (
            <button className="absolute inset-0 flex items-center justify-center" aria-label="Prehrať video">
              <div className="rounded-full border-2 flex items-center justify-center" style={{ width: "98px", height: "98px", borderColor: "var(--color-cream-light)" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M10 6L26 16L10 26V6Z" fill="var(--color-cream-light)" />
                </svg>
              </div>
            </button>
          )}
        </motion.div>

        {/* Thumbnails row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-6 px-4 sm:px-8 lg:px-[235px]">
          {(thumbnails.length > 0 ? thumbnails : Array(4).fill(null)).map((video, i) => {
            const ytId = video ? getYouTubeId(video.youtubeUrl) : null;
            const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;
            return (
              <motion.div
                key={video?.id ?? i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden cursor-pointer group"
                style={{ height: "clamp(90px, 15vw, 140px)", borderRadius: "6px", backgroundColor: "#2a2520" }}
              >
                {thumb && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={thumb} alt={video?.title ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-300 opacity-80" />
                )}
                {video && (
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-end p-3 bg-black/30 hover:bg-black/10 transition-colors">
                    <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "var(--color-cream-light)", letterSpacing: "1px" }}>
                      {video.title}
                    </span>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center pb-12 px-4 sm:px-8 lg:px-[235px]">
          <Link
            href="/media/archiv"
            className="inline-flex items-center gap-3 rounded-full px-8 py-3 transition-colors hover:bg-[#977d3e]"
            style={{ backgroundColor: "var(--color-gold)", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "var(--color-cream-light)" }}
          >
            Zobraziť všetky záznamy →
          </Link>
        </div>
      </div>
    </section>
  );
}
