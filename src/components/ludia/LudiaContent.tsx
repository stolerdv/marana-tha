"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
        <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
          <SectionHeading watermark="líderský tím" subtitle="Líderský tím" />

          {/* 5 cards row — justify-between gives gap=(1042-5*174)/4=43px ✓ */}
          <div className="flex justify-between">
            {leaders.map((person, i) => (
              <PersonCard key={i} person={person} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VEDÚCI SLUŽIEB ── */}
      {/* 3 columns with service label + 3 person cards each */}
      {/* Column x positions from content left: 0, 367, 749 */}
      <section className="bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
          <SectionHeading watermark="vedúci služieb" subtitle="vedúci služieb" />

          {/* 3 columns — absolute positions matching Figma: 0, 367, 749 from content left */}
          <div className="relative" style={{ height: `${3 * 310 + 3 * 55 + 6 * 16 + 3 * 108}px` }}>
            {serviceGroups.map((group, colIdx) => {
              // Column x positions: 0, 367, 749
              const xPositions = [0, 367, 749];
              return (
                <div
                  key={colIdx}
                  className="absolute flex flex-col"
                  style={{ left: `${xPositions[colIdx]}px`, top: 0, width: "174px" }}
                >
                  {group.people.map((person, cardIdx) => (
                    <div key={cardIdx}>
                      {/* Service label above each card — Commissioner 700 30px lh=55px */}
                      <p
                        style={{
                          fontFamily: "var(--font-commissioner)",
                          fontSize: "30px",
                          fontWeight: 700,
                          lineHeight: "55px",
                          color: "#000000",
                          margin: 0,
                        }}
                      >
                        {group.serviceName}
                      </p>

                      {/* Person card — 174×310 */}
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (colIdx + cardIdx) * 0.07 }}
                        className="bg-white"
                        style={{
                          width: "174px",
                          height: "310px",
                          borderRadius: "15px",
                          overflow: "hidden",
                          marginBottom: cardIdx < group.people.length - 1 ? "108px" : "0",
                        }}
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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
