"use client";

import { motion } from "framer-motion";

const ICONS = [
  <svg key="1" width="43" height="55" viewBox="0 0 43 55" fill="none">
    <rect x="3" y="10" width="37" height="32" rx="2" stroke="#fdf5f2" strokeWidth="2.5" />
    <path d="M3 20h37M13 3v9M30 3v9" stroke="#fdf5f2" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 30h8M23 30h8M12 38h8" stroke="#fdf5f2" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  <svg key="2" width="55" height="50" viewBox="0 0 55 50" fill="none">
    <path d="M5 43L17 7l13 13 13-13 7 36" stroke="#fdf5f2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="30" cy="20" r="5" stroke="#fdf5f2" strokeWidth="2" />
  </svg>,
  <svg key="3" width="55" height="55" viewBox="0 0 55 55" fill="none">
    <circle cx="21" cy="17" r="8" stroke="#fdf5f2" strokeWidth="2.5" />
    <path d="M3 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#fdf5f2" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="40" cy="14" r="5.5" stroke="#fdf5f2" strokeWidth="2" />
    <path d="M46 46c0-6.627-2.686-12-6-12" stroke="#fdf5f2" strokeWidth="2" strokeLinecap="round" />
  </svg>,
];

const DEFAULTS = [
  "od roku\n2008",
  "pôsobíme\nv 3 mestách",
  "viac ako\n250 členov",
];

interface Props {
  stat1Value?: string; stat1Label?: string;
  stat2Value?: string; stat2Label?: string;
  stat3Value?: string; stat3Label?: string;
}

export function ONasStats({ stat1Value, stat1Label, stat2Value, stat2Label, stat3Value, stat3Label }: Props) {
  const labels = [
    stat1Value && stat1Label ? `${stat1Value}\n${stat1Label}` : (stat1Label ?? DEFAULTS[0]),
    stat2Value && stat2Label ? `${stat2Value}\n${stat2Label}` : (stat2Label ?? DEFAULTS[1]),
    stat3Value && stat3Label ? `${stat3Value}\n${stat3Label}` : (stat3Label ?? DEFAULTS[2]),
  ];

  return (
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "143px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
        <div className="flex justify-between" style={{ paddingLeft: "81px", paddingRight: "81px" }}>
          {labels.map((label, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="flex flex-col items-start">
              <div className="flex items-center justify-center"
                style={{ width: "108px", height: "108px", backgroundColor: "#bea055", borderRadius: "15px" }}>
                {ICONS[i]}
              </div>
              <p style={{ marginTop: "40px", fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", whiteSpace: "pre-line" }}>
                {label}
              </p>
            </motion.div>
          ))}
        </div>
        <div style={{ height: "109px" }} />
      </div>
    </section>
  );
}
