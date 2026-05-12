"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const partners = [
  { name: "ZKSM", slug: "zksm", description: "Združenie kresťanských spoločenstiev mládeže na Slovensku." },
  { name: "ENC", slug: "enc", description: "Európska sieť cirkevných spoločenstiev spájajúca komunity z celej Európy." },
  { name: "CHARIS", slug: "charis", description: "Medzinárodná organizácia pre katolícku charizmatickú obnovu." },
  { name: "STRAPAR", slug: "strapar", description: "Kresťanská organizácia pre pastoráciu mládeže a rodín." },
];

export function ONasPartnerstva() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
          {partners.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ paddingBottom: "48px" }}>
              <div style={{ height: "1px", backgroundColor: "#bea055", width: "100%", marginBottom: "0px" }} />
              <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, lineHeight: 1.4, color: "#1c1d1e", margin: "8px 0" }}>
                {p.name}
              </h3>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", fontWeight: 400, lineHeight: 1.65, color: "#000000", marginBottom: "24px" }}>
                {p.description}
              </p>
              <Link href={`/o-nas/partnerstva/${p.slug}`} className="inline-flex items-center gap-2" style={{ height: "46px", backgroundColor: "#bea055", borderRadius: "50px", paddingLeft: "24px", paddingRight: "18px", fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#fdf5f2" }}>
                Čítať viac
                <svg width="28" height="8" viewBox="0 0 28 8" fill="none"><path d="M0 4h24M20 1l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
