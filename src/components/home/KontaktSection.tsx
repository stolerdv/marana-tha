"use client";

import { motion } from "framer-motion";

export function KontaktSection() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden pb-0">
      <div className="max-w-[1512px] mx-auto" style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* Watermark */}
        <div className="relative flex justify-center pointer-events-none select-none pt-12 mb-4">
          <div style={{ fontSize: "100px", fontFamily: "var(--font-commissioner)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", letterSpacing: "-2px", whiteSpace: "nowrap" }}>
            KONTAKT
          </div>
        </div>

        <div className="flex gap-12 items-start pb-16">
          {/* Heart/pin icon — gold */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="shrink-0 mt-2"
          >
            <svg width="63" height="81" viewBox="0 0 63 81" fill="none">
              <path
                d="M31.5 0C14.1 0 0 14.1 0 31.5C0 49.9 31.5 81 31.5 81C31.5 81 63 49.9 63 31.5C63 14.1 48.9 0 31.5 0Z"
                fill="var(--color-gold)"
              />
              {/* Heart cutout */}
              <path
                d="M31.5 50C31.5 50 18 40 18 30C18 24.5 22.5 20 28 21C29.5 21.5 30.7 22.5 31.5 23.5C32.3 22.5 33.5 21.5 35 21C40.5 20 45 24.5 45 30C45 40 31.5 50 31.5 50Z"
                fill="white"
              />
            </svg>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "26px", fontWeight: 300, color: "var(--color-ink)", lineHeight: 1.7 }}>
              MaranaTha Komunitno-pastoračné centrum
              <br />
              sv. Jána Pavla II.
              <br />
              Švábska 22 080 05, Prešov
              <br />
              E-mail: info@maranathapo.sk
            </p>
          </motion.div>
        </div>

        {/* Gold divider line */}
        <div style={{ height: "1px", backgroundColor: "var(--color-gold)", width: "100%" }} />
      </div>
    </section>
  );
}
