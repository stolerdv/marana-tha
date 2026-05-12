"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma frame 2 positions (all relative to frame y=202, content left = frame x+235):
//
// SECTION 1 (Naše pôsobenie): starts at ~y=1550 (after stats)
//   image 10: 824×548 r=15, x=522 from content (bleeds right), y=1552 → section-relative y=0
//   "Naše pôsobenie": Commissioner 700 30px, x=70, y=1757 → section-relative y=207
//   body text: Inter 500 18px lh=26.1, x=70, y=1826 → section-relative y=276
//   gold divider: Rectangle 76 700×1 #bea055, y=2014 → section-relative y=464
//
// SECTION 2 (Naša vízia): continues below
//   image 11: 824×549 r=15, starts at x=-303 from content (bleeds LEFT), y=2302 → section-relative y=752
//   "Naša vízia": Commissioner 700 30px, x=596, y=2527 → section-relative y=977
//   body text: Inter 500 18px, x=596, y=2596 → section-relative y=1046
//   gold divider: Rectangle 77 700×1, y=2586 → section-relative y=1036 (right side, x=626)

export function ONasPossobenie() {
  return (
    <section className="bg-[var(--color-cream)] overflow-hidden">

      {/* ── NAŠE PÔSOBENIE ── */}
      {/* Figma: image on right (x=522 from content, bleeds off screen), text on left */}
      <div className="relative" style={{, height: "550px" }}>

        {/* Large photo — bleeds right off content edge */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute overflow-hidden"
          style={{
            left: `${235 + 522}px`,   // 235px section padding + 522px from content left
            top: "0px",
            width: "824px",
            height: "548px",
            borderRadius: "15px",
          }}
        >
          <Image src="/images/o-nas-possobenie-1.jpg" alt="Naše pôsobenie" fill className="object-cover" />
        </motion.div>

        {/* Text — left column, y=207 from section top */}
        <div className="absolute" style={{ left: "235px", top: "207px", width: "440px" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {/* "Naše pôsobenie" — Commissioner 700 30px #1c1d1e lh=55px */}
            <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", marginBottom: "0px" }}>
              Naše pôsobenie
            </h2>
            {/* Body — Inter 500 18px lh=26.1px */}
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 500, lineHeight: "26.1px", color: "#000000", marginTop: "0px" }}>
              Spoločenstvo Marana Tha pôsobí v troch mestách na východnom Slovensku — v Prešove, Bardejove a Košiciach. Každé z miest má svoju vlastnú skupinu veriacich, ktorí sa pravidelne stretávajú na chválach, modlitbách a formácii.
            </p>
          </motion.div>
        </div>

        {/* Gold divider line — Figma: 700×1 #bea055, y=464 from section top, from left x=1 */}
        <div
          className="absolute"
          style={{ left: "1px", top: "464px", width: "700px", height: "1px", backgroundColor: "#bea055" }}
        />
      </div>

      {/* ── NAŠA VÍZIA ── */}
      {/* Figma: image bleeds LEFT (x=-303 from content = starts at x=235-303=-68px from section left), text on right */}
      <div className="relative" style={{, height: "600px" }}>

        {/* Large photo — bleeds left off section edge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute overflow-hidden"
          style={{
            left: "-68px",   // 235px - 303px = -68px from section left
            top: "0px",
            width: "824px",
            height: "549px",
            borderRadius: "15px",
          }}
        >
          <Image src="/images/o-nas-possobenie-2.jpg" alt="Naša vízia" fill className="object-cover" />
        </motion.div>

        {/* Text — right column: x=596 from content left = 235+596=831px from section left */}
        <div className="absolute" style={{ left: `${235 + 596}px`, top: "225px", width: "406px" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {/* "Naša vízia" — Commissioner 700 30px */}
            <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", marginBottom: "0px" }}>
              Naša vízia
            </h2>
            {/* Body — Inter 500 18px lh=26.1px */}
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 500, lineHeight: "26.1px", color: "#000000" }}>
              Chceme budovať živé kresťanské spoločenstvo, kde každý môže nájsť miesto prijatia, rásť vo viere a prispieť svojimi darmi k Božiemu kráľovstvu. Naším cieľom je evanjelizácia a formácia veriacich v duchu katolíckej tradície.
            </p>
          </motion.div>
        </div>

        {/* Gold divider — Figma: Rectangle 77 700×1 #bea055, right side x=379 from content = 614px, y=1036 from section start */}
        <div
          className="absolute"
          style={{ left: `${235 + 379}px`, bottom: "0px", width: "700px", height: "1px", backgroundColor: "#bea055" }}
        />
      </div>

    </section>
  );
}
