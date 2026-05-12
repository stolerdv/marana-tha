"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { ZistitViac } from "@/components/shared/ZistitViac";

interface TeamMember {
  name: string;
  role?: string;
  image?: string;
}

interface CityPageProps {
  city: string;
  heroImage: string;
  description: string;
  // Figma: "Kde sa stretávame" event label, e.g. "Večer chvál v PO"
  meetingLabel: string;
  team: TeamMember[];
}

// Figma city frame at y=263 → titleTop=467 (same as kde-sme)
// "Kde sa stretávame" strip structure (all relative to frame top=263):
//   image 8 (1044×243 r=15): y=843 from section top (absolute y=1106)
//   Rectangle 51 (dark #292929 939×172 r=15): y=879 (36px from photo top)
//   "Kde sa stretávame" title: Inter 700 50px, y=896 (53px from photo top)
//   Location pill: Inter 400 20px, y=976 (133px from photo top)
//   Beige strip (#e6ded5 1044×123 r=15): y=1000 (overlaps photo bottom, 157px from photo top)
//
// Líderský tím section (relative to frame top):
//   Watermark "líderský tím" 100px: y=1165
//   Subtitle 50px gold-dark: y=1202
//   5 team cards (174×310px each, gap 43px): y=1416

function TeamCarousel({ team }: { team: TeamMember[] }) {
  const ref = useRef<HTMLDivElement>(null);
  function scroll(dir: number) { ref.current?.scrollBy({ left: dir * 190, behavior: "smooth" }); }
  return (
    <div className="relative">
      <div ref={ref} className="flex gap-4 lg:gap-0 lg:justify-between overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
        {team.map((member, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="bg-white shrink-0" style={{ width: "174px", height: "310px", borderRadius: "15px", overflow: "hidden", scrollSnapAlign: "start" }}>
            <div className="relative overflow-hidden" style={{ margin: "11px auto 0", width: "154px", height: "198px", borderRadius: "15px", backgroundColor: "#e6ded5" }}>
              {member.image && <Image src={member.image} alt={member.name} fill className="object-cover object-top" />}
            </div>
            <div style={{ padding: "10px 17px 0" }}>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 400, color: "#000000" }}>{member.name}</p>
              {member.role && <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#977d3e", marginTop: "2px" }}>{member.role}</p>}
            </div>
          </motion.div>
        ))}
      </div>
      {team.length > 2 && (
        <div className="flex items-center justify-center gap-4 mt-4 lg:hidden">
          <button onClick={() => scroll(-1)} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #bea055", color: "#bea055", background: "transparent", cursor: "pointer" }}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", color: "#977d3e" }}>{team.length} ľudí</span>
          <button onClick={() => scroll(1)} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #bea055", color: "#bea055", background: "transparent", cursor: "pointer" }}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

export function CityPage({ city, heroImage, description, meetingLabel, team }: CityPageProps) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — titleTop=467 (frame at y=263, title absolute y=730) */}
        <PageHero
          title={city}
          description={description}
          image={heroImage}
          titleTop={467}
        />

        {/* ── KDE SA STRETÁVAME ── */}
        <section className="bg-[var(--color-cream)] overflow-hidden px-4 sm:px-8 lg:px-[235px] pt-8 pb-0">
          {/* Photo with overlay text */}
          <div className="relative overflow-hidden w-full" style={{ borderRadius: "15px", height: "clamp(180px, 30vw, 280px)" }}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')`, filter: "grayscale(80%)" }} />
            <div className="absolute inset-0 bg-black/50" />
            {/* Centered text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(22px,4vw,50px)", fontWeight: 700, color: "#fdf5f2", textAlign: "center" }}>
                Kde sa stretávame
              </span>
              <div style={{ border: "1px solid rgba(253,245,242,0.6)", borderRadius: "75px", padding: "8px 20px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(14px,2vw,20px)", color: "#fdf5f2" }}>{meetingLabel}</span>
              </div>
            </div>
          </div>
          {/* Beige strip below */}
          <div style={{ backgroundColor: "#e6ded5", borderRadius: "15px", height: "clamp(40px,8vw,80px)", marginTop: "-20px", position: "relative", zIndex: 0 }} />
        </section>

        {/* ── LÍDERSKÝ TÍM section ── */}
        {/* Starts at y=1165 from frame top (=1165-990=175px below "kde sa stretavame" section end at ~1123) */}
        <section
          className="relative bg-[var(--color-cream)] overflow-hidden"
          style={{ paddingTop: "42px", paddingBottom: "80px" }}
        >
          {/* Watermark "líderský tím" — Figma: Commissioner 700 100px ls=10 */}
          <div
            className="absolute pointer-events-none select-none"
            style={{
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-commissioner)",
              fontSize: "100px",
              fontWeight: 700,
              letterSpacing: "10px",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,0,0,0.06)",
              whiteSpace: "nowrap",
            }}
          >
            líderský tím
          </div>

          <div className="relative px-4 sm:px-8 lg:px-[235px]">
            {/* Subtitle — Figma: Commissioner 400 50px #977d3e lh=55px */}
            <p
              style={{
                fontFamily: "var(--font-commissioner)",
                fontSize: "50px",
                fontWeight: 400,
                lineHeight: "55px",
                color: "#977d3e",
                marginBottom: "48px",
              }}
            >
              líderský tím
            </p>

            <TeamCarousel team={team} />
          </div>
        </section>

        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
