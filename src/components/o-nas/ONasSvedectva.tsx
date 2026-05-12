"use client";

import { motion } from "framer-motion";

// Figma svedectvá section:
// Watermark "svedectvá": 100px Commissioner ls=10, y=3380
// Subtitle "svedectvá": Commissioner 400 50px #977d3e, y=3423
// image 17: 1528×633 full-width photo, y=3578
// Rectangle 87: 1044×384 white r=17 overlay card, y=3676 (within photo area)
// Inside card: name (Inter 700 22px), quote text (Inter 500 18px lh=26.1)
// Progress indicator: Group 38 at y=4343 (line with progress bar)

const svedectva = [
  {
    name: "Meno Priezvisko",
    text: "Spoločenstvo Marana Tha mi zmenilo život. Tu som našiel skutočných priateľov a miesto, kde môžem rásť vo viere. Každé stretnutie je pre mňa požehnaním a inšpiráciou do každodenného života.",
  },
];

export function ONasSvedectva() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "80px" }}>

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
        svedectvá
      </div>

      {/* Subtitle — Commissioner 400 50px #977d3e */}
      <div className="relative px-4 sm:px-8 lg:px-[235px]">
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "43px" }}>
          svedectvá
        </p>
      </div>

      {/* Full-width photo container */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(340px, 55vw, 633px)" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/o-nas-svedectva.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* White card overlay — Figma: Rectangle 87 1044×384 r=17, positioned within photo */}
        {/* y offset = 3878-3780=98px from photo top, centered x: photo starts at x=-460 absolute, card at x=-218 → x from photo left = -218-(-460)=242 ≈ (1528-1044)/2=242 centered ✓ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute bg-white"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: "clamp(16px, 4vw, 98px)",
            width: "min(calc(100% - 32px), 1044px)",
            borderRadius: "17px",
            padding: "clamp(20px, 4vw, 48px) clamp(16px, 4vw, 56px)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {svedectva.map((s, i) => (
            <div key={i} className="flex flex-col gap-4">
              {/* Person icon + name */}
              <div className="flex items-center gap-4">
                <div
                  className="shrink-0 rounded-full overflow-hidden"
                  style={{ width: "45px", height: "51px", backgroundColor: "#e6ded5" }}
                />
                {/* Name — Figma: Inter 700 22px lh=31.9px ls=-0.11 #000000 */}
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 700, lineHeight: 1.4, color: "#000000" }}>
                  {s.name}
                </span>
              </div>

              {/* Quote text — Figma: Inter 500 18px lh=26.1px ls=-0.09 #000000 */}
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(15px,2vw,18px)", fontWeight: 500, lineHeight: 1.65, color: "#000000" }}>
                {s.text}
              </p>

              {/* Progress indicator — Figma: Group 38 (line 616×1 + thick segment 139×5) */}
              <div className="flex items-center" style={{ gap: "0px", marginTop: "24px" }}>
                <div style={{ width: "139px", height: "5px", backgroundColor: "#6f6c6b" }} />
                <div style={{ flex: 1, height: "1px", backgroundColor: "#6f6c6b" }} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom padding */}
      <div style={{ height: "80px" }} />
    </section>
  );
}
