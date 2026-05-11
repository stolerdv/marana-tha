"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface MinistryCard {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string | null;
  icon: string | null;
}

interface SluzbyGridProps {
  ministries: MinistryCard[];
}

// Split title: first word on line 1, rest on line 2
// "Detská služba" → ["Detská", "služba"]
// "Služba kurzov" → ["Služba", "kurzov"]
function splitTitle(title: string): [string, string] {
  const idx = title.indexOf(" ");
  if (idx === -1) return [title, ""];
  return [title.slice(0, idx), title.slice(idx + 1)];
}

export function SluzbyGrid({ ministries }: SluzbyGridProps) {
  const rows: MinistryCard[][] = [];
  for (let i = 0; i < ministries.length; i += 3) rows.push(ministries.slice(i, i + 3));

  return (
    <section className="bg-[var(--color-cream)] relative overflow-hidden" style={{ paddingTop: "137px", paddingBottom: "80px" }}>

      {/* Decorative thin lines */}
      <div className="absolute pointer-events-none" style={{ top: "60px", left: "235px", right: "235px", height: "1px", backgroundColor: "rgba(190,160,85,0.2)", zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ bottom: "60px", left: "235px", right: "235px", height: "1px", backgroundColor: "rgba(190,160,85,0.2)", zIndex: 0 }} />

      <div style={{ paddingLeft: "235px", paddingRight: "235px", position: "relative", zIndex: 1 }}>
        <div className="flex flex-col" style={{ gap: "144px" }}>
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="relative flex justify-between">
              {/* Per-row watermark */}
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "var(--font-commissioner)",
                  fontSize: "200px",
                  fontWeight: 700,
                  letterSpacing: "16px",
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(190,160,85,0.18)",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  zIndex: 0,
                }}
              >
                {rowIdx % 2 === 0 ? "SLUŽBA" : "SPOLOČENSTVO"}
              </div>

              {row.map((sluzba, i) => {
                const [line1, line2] = splitTitle(sluzba.title);
                return (
                  <motion.div
                    key={sluzba.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white"
                    style={{ width: "282px", height: "555px", borderRadius: "15px", overflow: "hidden", flexShrink: 0, position: "relative", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
                  >
                    <div style={{ padding: "0 33px" }}>
                      {/* Title — 2 lines always */}
                      <h2
                        style={{
                          fontFamily: "var(--font-commissioner)",
                          fontSize: "30px",
                          fontWeight: 700,
                          lineHeight: "52px",
                          color: "#1c1d1e",
                          margin: "0",
                        }}
                      >
                        {line1}
                        {line2 && <><br />{line2}</>}
                      </h2>

                      <div style={{ height: "1px", backgroundColor: "#bea055", width: "218px", marginTop: "6px" }} />

                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "18px",
                          fontWeight: 500,
                          lineHeight: "26.1px",
                          letterSpacing: "-0.09px",
                          color: "#000000",
                          marginTop: "14px",
                          marginBottom: "0",
                          maxHeight: "120px",
                          overflow: "hidden",
                        }}
                      >
                        {sluzba.description}
                      </p>
                    </div>

                    <Link
                      href={`/sluzby/${sluzba.slug}`}
                      className="inline-flex items-center gap-2"
                      style={{
                        position: "absolute",
                        top: "282px",
                        left: "33px",
                        width: "186px",
                        height: "50px",
                        backgroundColor: "#bea055",
                        borderRadius: "50px",
                        paddingLeft: "27px",
                        paddingRight: "20px",
                        fontFamily: "var(--font-commissioner)",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#fdf5f2",
                      }}
                    >
                      Čítať viac
                      <svg width="36" height="10" viewBox="0 0 36 10" fill="none">
                        <path d="M0 5h32M27 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </Link>

                    <div
                      className="absolute overflow-hidden"
                      style={{ left: "29px", top: "351px", width: "224px", height: "204px" }}
                    >
                      <Image
                        src={sluzba.coverImage ?? "/images/sluzby-hero.jpg"}
                        alt={sluzba.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
