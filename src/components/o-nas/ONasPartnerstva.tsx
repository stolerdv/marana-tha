"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma PARTNERSTVÁ section:
// Watermark "PARTNERSTVÁ": 100px Commissioner ls=10, y=4353
// Subtitle "partnerstvá": Commissioner 400 50px #977d3e, y=4391
// 4 partners in 2 columns (left x=0, right x=626 from content):
//   Left col: ZKSM (y=4353→4541), CHARIS (y=5108→5475)
//   Right col: ENC (y=4828→5195), STRAPAR (y=5391→5660)
// Each partner: title (Commissioner 700 30px), text (Inter 500 18px), gold divider (700×1 #bea055), button

const partners = [
  {
    name: "ZKSM",
    description: "Združenie kresťanských spoločenstiev mládeže. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    logo: null,
    col: "left",
    dividerY: true,
  },
  {
    name: "ENC",
    description: "Európska sieť cirkevných spoločenstiev. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    logo: null,
    col: "right",
    dividerY: true,
  },
  {
    name: "CHARIS",
    description: "Katolícka charizmatická obnova. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    logo: null,
    col: "left",
    dividerY: false,
  },
  {
    name: "STRAPAR",
    description: "Kresťanská organizácia pre mládež. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    logo: null,
    col: "right",
    dividerY: false,
  },
];

export function ONasPartnerstva() {
  const leftPartners = partners.filter(p => p.col === "left");
  const rightPartners = partners.filter(p => p.col === "right");

  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "100px", paddingBottom: "80px" }}>

      {/* Watermark */}
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
        PARTNERSTVÁ
      </div>

      <div className="relative px-4 sm:px-8 lg:px-[235px]">

        {/* Subtitle */}
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
          partnerstvá
        </p>

        {/* Two-column grid — left col x=0, right col x=626 from content (= gap 626-first_col_content) */}
        <div className="flex gap-0">

          {/* Left column — width: 626px */}
          <div className="flex flex-col" style={{ width: "626px" }}>
            {leftPartners.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ paddingBottom: "80px" }}
              >
                {/* Logo placeholder if exists */}
                {p.logo && (
                  <div style={{ marginBottom: "12px" }}>
                    <Image src={p.logo} alt={p.name} width={45} height={51} />
                  </div>
                )}

                {/* Gold divider above title — Figma: 700×1 #bea055 */}
                <div style={{ height: "1px", backgroundColor: "#bea055", width: "700px", marginBottom: "0px" }} />

                {/* Title — Figma: Commissioner 700 30px lh=55px #1c1d1e */}
                <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", margin: "0px" }}>
                  {p.name}
                </h3>

                {/* Description — Figma: Inter 500 18px lh=26.1px #000000 */}
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 500, lineHeight: "26.1px", color: "#000000", marginBottom: "32px", maxWidth: "403px" }}>
                  {p.description}
                </p>

                {/* Button — Figma: Group 34/40, 186×50 #bea055 r=50, Commissioner 700 15px #fdf5f2 */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2"
                  style={{
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
                </a>
              </motion.div>
            ))}
          </div>

          {/* Right column — starts at x=626 from content left, gap from left = 626-0=626px */}
          <div className="flex flex-col" style={{ flex: 1 }}>
            {rightPartners.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05 }}
                style={{ paddingBottom: "80px" }}
              >
                {/* Logo placeholder if exists */}
                {p.logo && (
                  <div style={{ marginBottom: "12px" }}>
                    <Image src={p.logo} alt={p.name} width={36} height={36} style={{ borderRadius: "73px" }} />
                  </div>
                )}
                {/* Gold divider */}
                <div style={{ height: "1px", backgroundColor: "#bea055", width: "700px", marginBottom: "0px" }} />
                {/* Title */}
                <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", margin: "0px" }}>
                  {p.name}
                </h3>
                {/* Description */}
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 500, lineHeight: "26.1px", color: "#000000", marginBottom: "32px", maxWidth: "403px" }}>
                  {p.description}
                </p>
                {/* Button */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2"
                  style={{
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
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
