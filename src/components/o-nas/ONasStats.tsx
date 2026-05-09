"use client";

import { motion } from "framer-motion";

// Figma: 3 gold boxes 108×108 r=15, centered in content (margin 81px each side, gap 278px between boxes)
// Texts: Commissioner 700 30px lh=55px, below boxes with 40px gap
const stats = [
  {
    label: "od roku\n2008",
    icon: (
      // Figma Vector ~43×62: year/calendar icon
      <svg width="43" height="55" viewBox="0 0 43 55" fill="none">
        <rect x="3" y="10" width="37" height="32" rx="2" stroke="#fdf5f2" strokeWidth="2.5" />
        <path d="M3 20h37M13 3v9M30 3v9" stroke="#fdf5f2" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 30h8M23 30h8M12 38h8" stroke="#fdf5f2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "pôsobíme\nv 3 mestách",
    icon: (
      // Figma Vector ~70×55: map/location icon
      <svg width="55" height="50" viewBox="0 0 55 50" fill="none">
        <path d="M5 43L17 7l13 13 13-13 7 36" stroke="#fdf5f2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="20" r="5" stroke="#fdf5f2" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "viac ako\n250 členov",
    icon: (
      // Figma Vector ~63×69: people icon
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none">
        <circle cx="21" cy="17" r="8" stroke="#fdf5f2" strokeWidth="2.5" />
        <path d="M3 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#fdf5f2" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="40" cy="14" r="5.5" stroke="#fdf5f2" strokeWidth="2" />
        <path d="M46 46c0-6.627-2.686-12-6-12" stroke="#fdf5f2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ONasStats() {
  return (
    // Stats start at y=1133 from page top; hero ends at y=990 → pt = 143px
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "143px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* Gold boxes row — Figma: padding 81px each side → gap 278px between 108px boxes = (1042-81-81-3*108)/2=278 ✓ */}
        <div className="flex justify-between" style={{ paddingLeft: "81px", paddingRight: "81px" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col items-start"
            >
              {/* Gold box — Figma: 108×108 #bea055 r=15 */}
              <div
                className="flex items-center justify-center"
                style={{ width: "108px", height: "108px", backgroundColor: "#bea055", borderRadius: "15px" }}
              >
                {stat.icon}
              </div>

              {/* Text below box — Figma: Commissioner 700 30px lh=55px, gap 40px below box */}
              <p
                style={{
                  marginTop: "40px",
                  fontFamily: "var(--font-commissioner)",
                  fontSize: "30px",
                  fontWeight: 700,
                  lineHeight: "55px",
                  color: "#1c1d1e",
                  whiteSpace: "pre-line",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom padding — section ends before the large photo section */}
        <div style={{ height: "109px" }} />
      </div>
    </section>
  );
}
