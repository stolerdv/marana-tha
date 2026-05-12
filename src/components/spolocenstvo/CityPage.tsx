"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
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

interface NextVCH { id: string; title: string; slug: string; startDate: Date; }

interface CityPageProps {
  city: string;
  heroImage: string;
  description: string;
  meetingLabel: string;
  nextVCH?: NextVCH;
  team: TeamMember[];
}

function calcTime(target: Date) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return { d: Math.floor(diff / 86400000), h: Math.floor((diff / 3600000) % 24), m: Math.floor((diff / 60000) % 60), s: Math.floor((diff / 1000) % 60) };
}

function CityCountdown({ target }: { target: Date }) {
  const [t, setT] = useState(calcTime(target));
  useEffect(() => { const id = setInterval(() => setT(calcTime(target)), 1000); return () => clearInterval(id); }, [target]);
  const units = [{ v: t.d, l: "dní" }, { v: t.h, l: "hodín" }, { v: t.m, l: "minút" }, { v: t.s, l: "sekúnd" }];
  return (
    <div className="flex items-end">
      {units.map((u, i) => (
        <div key={u.l} className="flex items-end">
          <div className="flex flex-col items-center" style={{ minWidth: "clamp(52px,10vw,80px)" }}>
            <AnimatePresence mode="wait">
              <motion.span key={String(u.v).padStart(2,"0")} initial={{ y:-6,opacity:0 }} animate={{ y:0,opacity:1 }} exit={{ y:6,opacity:0 }} transition={{ duration: 0.15 }}
                style={{ fontFamily:"var(--font-commissioner)", fontSize:"clamp(28px,5vw,48px)", fontWeight:300, lineHeight:1, color:"#fdf5f2", letterSpacing:"-1px", display:"block" }}>
                {String(u.v).padStart(2,"0")}
              </motion.span>
            </AnimatePresence>
            <span style={{ fontFamily:"var(--font-commissioner)", fontSize:"10px", fontWeight:400, color:"rgba(253,245,242,0.45)", textTransform:"uppercase", letterSpacing:"2px", marginTop:"3px" }}>{u.l}</span>
          </div>
          {i < 3 && <span style={{ fontFamily:"var(--font-commissioner)", fontSize:"clamp(20px,4vw,36px)", fontWeight:300, color:"rgba(190,160,85,0.45)", lineHeight:1, marginBottom:"16px", padding:"0 2px" }}>:</span>}
        </div>
      ))}
    </div>
  );
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

export function CityPage({ city, heroImage, description, meetingLabel, nextVCH, team }: CityPageProps) {
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

        {/* ── KDE SA STRETÁVAME + VCH COUNTDOWN ── */}
        <section className="bg-[var(--color-cream)] px-4 sm:px-8 lg:px-[235px] pt-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ borderRadius: "20px", overflow: "hidden", position: "relative", background: "linear-gradient(160deg, #12110f 0%, #1e1910 100%)", border: "1px solid rgba(190,160,85,0.25)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
          >
            {/* B&W bg photo */}
            <div className="absolute inset-0" style={{ backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(100%)", opacity: 0.1 }} />
            <div style={{ padding: "28px clamp(20px,4vw,40px) 32px", position: "relative" }}>
              {/* Label */}
              <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginBottom: "16px" }}>
                <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "11px", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(190,160,85,0.7)" }}>
                  Najbližší večer chvál · {city}
                </span>
                <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", color: "rgba(253,245,242,0.4)", border: "1px solid rgba(253,245,242,0.15)", borderRadius: "50px", padding: "4px 14px" }}>
                  {meetingLabel}
                </span>
              </div>
              <div style={{ height: "1px", background: "linear-gradient(to right, rgba(190,160,85,0.5), transparent)", marginBottom: "20px" }} />

              {nextVCH ? (
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: "#fdf5f2", marginBottom: "16px", lineHeight: 1.2 }}>
                      {new Date(nextVCH.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <CityCountdown target={new Date(nextVCH.startDate)} />
                  </div>
                  <Link href={`/udalosti/vecer-chval`} className="self-start sm:self-auto hover:opacity-80 transition-opacity"
                    style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#bea055", display: "flex", alignItems: "center", gap: "8px", paddingBottom: "4px" }}>
                    Zobraziť všetky
                    <svg width="24" height="8" viewBox="0 0 24 8" fill="none"><path d="M0 4h20M16 1l4 3-4 3" stroke="#bea055" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </Link>
                </div>
              ) : (
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", color: "rgba(253,245,242,0.4)" }}>
                  Termín bude čoskoro oznámený
                </p>
              )}
            </div>
          </motion.div>
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
