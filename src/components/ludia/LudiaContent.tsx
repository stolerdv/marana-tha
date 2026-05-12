"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

// Figma frame 10 @(14077,263) 1512×5440. Content left=14312.
//
// LÍDERSKÝ TÍM:
//   Watermark "líderský tím" 100px, Subtitle "Líderský tím" 50px gold-dark
//   Group 74 (1042×310): y=1550-263=1287 from frame top → pt after hero = 297px
//   5 cards (174×310) in a row, gap=43px (justify-between)
//
// VEDÚCI SLUŽIEB:
//   Watermark "vedúci služieb" 100px, Subtitle "vedúci služieb" 50px gold-dark
//   3 columns, each has service label (Commissioner 700 30px) + 3 person cards (174×310)
//   Col positions from content left: col1=0 (w=306), col2=367 (w=309), col3=749 (w=314)
//   Cards stacked vertically, gap between cards=108px

interface Person {
  name: string;
  image?: string;
}

interface ServiceGroup {
  serviceName: string;
  people: Person[];
}

interface LudiaContentProps {
  leaders: Person[];           // líderský tím — 5 people
  serviceGroups: ServiceGroup[]; // vedúci služieb — 3 columns of 3 people each
}

function PersonCard({ person, delay = 0 }: { person: Person; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white shrink-0"
      style={{ width: "174px", height: "310px", borderRadius: "15px", overflow: "hidden" }}
    >
      {/* Photo — Figma: image 18, 154×198 (first card) or 106×125 (others), r=15, y=11 from card top */}
      <div
        className="relative overflow-hidden"
        style={{ margin: "11px auto 0", width: "154px", height: "198px", borderRadius: "15px", backgroundColor: "#e6ded5" }}
      >
        {person.image && (
          <Image src={person.image} alt={person.name} fill className="object-cover object-top" />
        )}
      </div>
      {/* Name — Figma: Inter 400 22px lh=31.9px #000000 */}
      <div style={{ padding: "10px 17px 0" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "22px", fontWeight: 400, lineHeight: "31.9px", color: "#000000", margin: 0 }}>
          {person.name}
        </p>
      </div>
    </motion.div>
  );
}

function LeadersCarousel({ leaders }: { leaders: Person[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);

  function scroll(dir: number) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * 190, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Desktop: flex row. Mobile: horizontal scroll */}
      <div
        ref={ref}
        className="flex gap-4 lg:gap-0 lg:justify-between overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
        onScroll={e => setPos((e.target as HTMLDivElement).scrollLeft)}
      >
        {leaders.map((person, i) => (
          <div key={i} className="shrink-0 lg:shrink" style={{ scrollSnapAlign: "start" }}>
            <PersonCard person={person} delay={i * 0.08} />
          </div>
        ))}
      </div>

      {/* Mobile arrow controls */}
      <div className="flex items-center justify-center gap-4 mt-4 lg:hidden">
        <button onClick={() => scroll(-1)} disabled={pos <= 10}
          className="flex items-center justify-center disabled:opacity-30 transition-all"
          style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #bea055", color: "#bea055", background: "transparent" }}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", color: "#977d3e" }}>
          {leaders.length} ľudí
        </span>
        <button onClick={() => scroll(1)}
          className="flex items-center justify-center transition-all"
          style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #bea055", color: "#bea055", background: "transparent" }}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

function SectionHeading({ watermark, subtitle }: { watermark: string; subtitle: string }) {
  return (
    <div className="relative" style={{ marginBottom: "48px" }}>
      {/* Watermark — Commissioner 700 100px ls=10 */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: "-8px",
          left: "0",
          fontFamily: "var(--font-commissioner)",
          fontSize: "100px",
          fontWeight: 700,
          letterSpacing: "10px",
          color: "transparent",
          WebkitTextStroke: "1px rgba(0,0,0,0.06)",
          whiteSpace: "nowrap",
        }}
      >
        {watermark}
      </div>
      {/* Subtitle — Commissioner 400 50px #977d3e lh=55px */}
      <p
        className="relative"
        style={{
          fontFamily: "var(--font-commissioner)",
          fontSize: "50px",
          fontWeight: 400,
          lineHeight: "55px",
          color: "#977d3e",
          margin: 0,
          paddingTop: "8px",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export function LudiaContent({ leaders, serviceGroups }: LudiaContentProps) {
  return (
    <>
      {/* ── LÍDERSKÝ TÍM ── */}
      {/* Cards at y=1287 from frame top; hero ends at 990 → pt=297 */}
      <section className="bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "137px", paddingBottom: "80px" }}>
        <div className="px-4 sm:px-8 lg:px-[235px]">
          <SectionHeading watermark="líderský tím" subtitle="Líderský tím" />

          <LeadersCarousel leaders={leaders} />
        </div>
      </section>

      {/* ── VEDÚCI SLUŽIEB ── */}
      {/* 3 columns with service label + 3 person cards each */}
      {/* Column x positions from content left: 0, 367, 749 */}
      <section className="bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="px-4 sm:px-8 lg:px-[235px]">
          <SectionHeading watermark="vedúci služieb" subtitle="vedúci služieb" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {serviceGroups.map((group, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-6">
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, lineHeight: "1.3", color: "#000000", margin: 0 }}>
                  {group.serviceName}
                </p>
                {group.people.map((person, cardIdx) => (
                  <div key={cardIdx}>
                      {/* Person card */}
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (colIdx + cardIdx) * 0.07 }}
                        className="bg-white"
                        style={{ width: "174px", height: "310px", borderRadius: "15px", overflow: "hidden" }}
                      >
                        <div
                          className="relative overflow-hidden"
                          style={{ margin: "11px auto 0", width: "106px", height: "125px", borderRadius: "15px", backgroundColor: "#e6ded5" }}
                        >
                          {person.image && (
                            <Image src={person.image} alt={person.name} fill className="object-cover" />
                          )}
                        </div>
                        <div style={{ padding: "10px 17px 0" }}>
                          <p style={{ fontFamily: "var(--font-inter)", fontSize: "22px", fontWeight: 400, lineHeight: "31.9px", color: "#000000", margin: 0 }}>
                            {person.name}
                          </p>
                        </div>
                      </motion.div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
