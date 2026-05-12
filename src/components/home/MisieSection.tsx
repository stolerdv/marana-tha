"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export function MisieSection() {
  return (
    <section className="relative bg-[var(--color-cream)] px-4 sm:px-8 lg:px-[235px] py-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className="relative overflow-hidden"
        style={{ borderRadius: "20px", minHeight: "360px", height: "auto" }}
      >
        {/* Background photo */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/misie.jpg')" }} />

        {/* Gradient: dark on left, transparent on right */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(18,17,15,0.97) 0%, rgba(18,17,15,0.75) 45%, rgba(18,17,15,0.1) 100%)" }} />

        {/* Warm colour tint */}
        <div className="absolute inset-0" style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn", opacity: 0.3 }} />

        {/* Content */}
        <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16">
          <div className="py-12 lg:py-0" style={{ maxWidth: "520px" }}>
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "11px", fontWeight: 700, letterSpacing: "5px", textTransform: "uppercase", color: "#bea055", display: "block", marginBottom: "20px" }}
            >
              Misijná práca
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(36px, 3.5vw, 52px)", fontWeight: 700, color: "#fdf5f2", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: "20px" }}
            >
              Nesieme vieru<br />
              <span style={{ color: "#bea055" }}>po celom svete.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "17px", color: "rgba(253,245,242,0.6)", lineHeight: 1.65, marginBottom: "36px" }}
            >
              Spoločenstvo Marana Tha sa aktívne zapája do misijnej práce doma i v zahraničí. Spoznaj príbehy a krajiny kde slúžime.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
            >
              <Link
                href="/misie"
                className="inline-flex items-center gap-3 rounded-full transition-all hover:gap-4"
                style={{ backgroundColor: "#bea055", color: "#12110f", padding: "14px 32px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700 }}
              >
                Spoznať naše misie
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                  <path d="M0 5h18M13 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
