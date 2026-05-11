"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PodporteNasSection() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden">
      <div className="max-w-[1512px] mx-auto" style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* Watermark + subtitle */}
        <div className="relative pt-12">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap"
            style={{ fontSize: "100px", fontFamily: "var(--font-commissioner)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", letterSpacing: "-2px" }}>
            Podporte NáS
          </div>

          <div className="relative text-center pt-8 mb-8">
            <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, color: "var(--color-gold-dark)" }}>
              podporte nás
            </span>
          </div>
        </div>

        {/* Main layout: person photo LEFT + content RIGHT */}
        <div className="flex items-start gap-0">

          {/* Person photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative shrink-0"
            style={{ width: "573px", height: "588px" }}
          >
            <Image
              src="/images/support-person.jpg"
              alt="Podporte Marana Tha"
              fill
              className="object-cover object-top"
              style={{ mixBlendMode: "multiply" }}
            />
          </motion.div>

          {/* Right side: gold banner + QR circle + thank you */}
          <div className="flex flex-col justify-center flex-1 pl-0" style={{ paddingLeft: "0px" }}>

            {/* Gold banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center px-10"
              style={{ backgroundColor: "var(--color-gold)", width: "552px", height: "173px" }}
            >
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "26px", fontWeight: 400, color: "white", lineHeight: 1.5 }}>
                Podporte našu službu cez QR kód alebo na číslo účtu SK0675000000004024300145
              </p>
            </motion.div>

            {/* QR code in gold circle + thank you text */}
            <div className="flex items-center gap-8 mt-6" style={{ paddingLeft: "32px" }}>

              {/* Large gold circle with QR */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center shrink-0"
                style={{
                  width: "160px", height: "160px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-gold)",
                }}
              >
                {/* QR code placeholder */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    {/* QR code pattern */}
                    <rect x="4" y="4" width="28" height="28" rx="2" fill="white" />
                    <rect x="9" y="9" width="18" height="18" rx="1" fill="#1c1d1e" />
                    <rect x="48" y="4" width="28" height="28" rx="2" fill="white" />
                    <rect x="53" y="9" width="18" height="18" rx="1" fill="#1c1d1e" />
                    <rect x="4" y="48" width="28" height="28" rx="2" fill="white" />
                    <rect x="9" y="53" width="18" height="18" rx="1" fill="#1c1d1e" />
                    <rect x="48" y="48" width="8" height="8" fill="white" />
                    <rect x="60" y="48" width="8" height="8" fill="white" />
                    <rect x="48" y="60" width="8" height="8" fill="white" />
                    <rect x="60" y="60" width="8" height="8" fill="white" />
                    <rect x="72" y="48" width="4" height="4" fill="white" />
                    <rect x="72" y="60" width="4" height="4" fill="white" />
                    <rect x="48" y="72" width="4" height="4" fill="white" />
                    <rect x="60" y="72" width="4" height="4" fill="white" />
                  </svg>
                </div>
              </motion.div>

              {/* Thank you text */}
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "26px", fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.4 }}>
                Ďakujeme
                <br />
                za prejavenú dôveru.
              </p>
            </div>
          </div>
        </div>

        <div className="pb-12" />
      </div>
    </section>
  );
}
