"use client";

import { motion } from "framer-motion";

// Figma: naše hodnoty section — Group 71 (1050×565)
// Watermark "naše hodnoty": Commissioner 700 100px ls=10, y=2734 from frame top
// Subtitle "naše hodnoty": Commissioner 400 50px #977d3e, y=2774
// Values list with gold dividers (1044×1 #bea055):
//   Left column (x=0 from content): Commissioner 700 30px lh=55px #1c1d1e
//   Right column (x=361 from content): Inter 500 18px lh=26.1px #000000
//   Items at y offsets: 2935, 3035, 3135, 3235 (relative to frame top)
//   Dividers at y: 3017, 3117, 3217

const hodnoty = [
  {
    title: "uctievanie",
    text: "Uctievanie Boha je srdcom nášho spoločenstva. Stretávame sa na pravidelných chválach a modlitbách, kde vyjadrujeme svoju lásku k Bohu.",
  },
  {
    title: "spoločenstvo",
    text: "Veríme, že viera rastie v spoločenstve. Malé skupinky sú miestom, kde sa ľudia stretávajú, rastú a navzájom si pomáhajú.",
  },
  {
    title: "malé skupinky",
    text: "Máme malé skupinky pre manželské páry, mužov, ženy, mladých, športovcov a ďalších. Každý nájde skupinku, kde môže rásť.",
  },
  {
    title: "duch, rast",
    text: "Boh ťa stvoril s darmi a zručnosťami, ktorými môžeš spôsobiť zmenu vo svojom okolí. Chceme ti pomôcť objaviť a rozvinúť tieto dary.",
  },
];

export function ONasHodnoty() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "100px", paddingBottom: "80px" }}>

      {/* Watermark — Figma: Commissioner 700 100px ls=10 transparent with stroke */}
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
        naše hodnoty
      </div>

      <div className="relative" style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* Subtitle — Figma: Commissioner 400 50px #977d3e lh=55px */}
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "0px" }}>
          naše hodnoty
        </p>

        {/* Values list — left title + right text with gold dividers */}
        <div className="flex flex-col" style={{ marginTop: "0px" }}>
          {hodnoty.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              {/* Gold divider above each row — Figma: 1044×1 #bea055 */}
              <div style={{ height: "1px", backgroundColor: "#bea055", width: "100%" }} />

              {/* Row: left title + right text */}
              <div className="flex items-start" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
                {/* Left — Figma: Commissioner 700 30px lh=55px #1c1d1e, x=0, col width to x=361 */}
                <div style={{ width: "361px", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e" }}>
                    {h.title}
                  </span>
                </div>
                {/* Right — Figma: Inter 500 18px lh=26.1px #000000, x=361 from content */}
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 500, lineHeight: "26.1px", color: "#000000", flex: 1 }}>
                  {h.text}
                </p>
              </div>
            </motion.div>
          ))}
          {/* Final divider */}
          <div style={{ height: "1px", backgroundColor: "#bea055", width: "100%" }} />
        </div>
      </div>
    </section>
  );
}
