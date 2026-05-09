"use client";

import { motion } from "framer-motion";

export function MisieSection() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden">
      <div className="max-w-[1512px] mx-auto" style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* Watermark */}
        <div className="relative pt-12 pb-8">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap"
            style={{ fontSize: "100px", fontFamily: "var(--font-commissioner)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", letterSpacing: "-2px" }}>
            MISIE
          </div>

          {/* Photo with rounded corners — key difference from our old version */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
            style={{
              width: "1042px",
              height: "403px",
              borderRadius: "16px",
              marginTop: "48px",
            }}
          >
            {/* Background photo */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/misie.jpg')" }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* White text banner */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: "65px", right: "65px",
                top: "103px", height: "84px",
                backgroundColor: "white",
              }}
            >
              <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "40px", fontWeight: 700, color: "var(--color-ink)" }}>
                podporte našu činnosť vo svete
              </span>
            </div>

            {/* Gold button */}
            <div className="absolute flex justify-center" style={{ bottom: "56px", left: 0, right: 0 }}>
              <a
                href="/misie"
                className="inline-flex items-center gap-3 rounded-full px-8 py-3 transition-colors"
                style={{ backgroundColor: "var(--color-gold)", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "var(--color-cream-light)" }}
              >
                Navštíviť náš web
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                  <path d="M0 5h18M13 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
