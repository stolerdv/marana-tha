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

// Figma frame 8 (@9783,263). Content left = 10018.
// 2 rows of 3 cards. Card: 282×555px white r=15. Column gap ≈98px. Row gap=144px.
// Card internal: title y=0, divider y=112, text y=113-282, button y=282, photo y=351

export function SluzbyGrid({ ministries }: SluzbyGridProps) {
  // Split into rows of 3
  const rows: MinistryCard[][] = [];
  for (let i = 0; i < ministries.length; i += 3) rows.push(ministries.slice(i, i + 3));

  return (
    // pt=137px: cards start at y=1127 from frame top (hero ends ~990)
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "137px", paddingBottom: "80px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
        <div className="flex flex-col" style={{ gap: "144px" }}>
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-between">
              {row.map((sluzba, i) => (
                <motion.div
                  key={sluzba.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white"
                  style={{ width: "282px", height: "555px", borderRadius: "15px", overflow: "hidden", flexShrink: 0, position: "relative" }}
                >
                  {/* Title — Figma: Commissioner 700 30px lh=55px #1c1d1e, 2 lines, from y=0, padded 33px */}
                  <div style={{ padding: "0 33px" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-commissioner)",
                        fontSize: "30px",
                        fontWeight: 700,
                        lineHeight: "55px",
                        color: "#1c1d1e",
                        whiteSpace: "pre-line",
                        margin: "0",
                      }}
                    >
                      {sluzba.title}
                    </h2>

                    {/* Gold divider — Figma: 218×1 #bea055, y=112 from card top (2px below title end ~110px) */}
                    <div style={{ height: "1px", backgroundColor: "#bea055", width: "218px", marginTop: "2px" }} />

                    {/* Body text — Inter 500 18px lh=26.1px, fills y=113 to y=282 (~169px = ~6.5 lines) */}
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

                    {/* Button — Figma: 186×50 #bea055 r=50 at y=282 from card top */}
                    {/* y=282 from card top, current flow would put it naturally after text */}
                  </div>

                  {/* Button at absolute y=282 */}
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

                  {/* Photo — Figma: 224×204 at y=351 from card top (fills card bottom: 351+204=555) */}
                  <div
                    className="absolute overflow-hidden"
                    style={{ left: "29px", top: "351px", width: "224px", height: "204px" }}
                  >
                    <Image
                      src={sluzba.coverImage ?? "/images/sluzba-placeholder.jpg"}
                      alt={sluzba.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
