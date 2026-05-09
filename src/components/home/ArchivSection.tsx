"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const thumbnails = [
  { src: "/images/support-1.jpg", label: "CHVÁL" },
  { src: "/images/support-2.jpg", label: "MODLITIEB" },
  { src: "/images/support-3.jpg", label: "STRETNUTIE" },
  { src: "/images/support-4.jpg", label: "ZVOLANIE" },
];

export function ArchivSection() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden">
      <div className="max-w-[1512px] mx-auto">

        {/* Watermark */}
        <div className="relative flex justify-center pointer-events-none select-none pt-12" style={{ paddingLeft: "235px", paddingRight: "235px" }}>
          <div style={{ fontSize: "100px", fontFamily: "var(--font-commissioner)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", letterSpacing: "-2px", whiteSpace: "nowrap" }}>
            ARCHÍV
          </div>
        </div>

        {/* Full-width video */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden"
          style={{ height: "656px" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/archiv.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Play button */}
          <button
            className="absolute inset-0 flex items-center justify-center group"
            aria-label="Prehrať video"
          >
            <div
              className="rounded-full border-2 flex items-center justify-center group-hover:bg-white/20 transition-all"
              style={{ width: "98px", height: "98px", borderColor: "var(--color-cream-light)" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M10 6L26 16L10 26V6Z" fill="var(--color-cream-light)" />
              </svg>
            </div>
          </button>
        </motion.div>

        {/* Thumbnails row */}
        <div className="flex gap-4 px-0 py-6" style={{ paddingLeft: "235px", paddingRight: "235px" }}>
          {thumbnails.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden cursor-pointer group"
              style={{ width: "250px", height: "140px", borderRadius: "6px", flexShrink: 0 }}
            >
              <Image src={t.src} alt={t.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "var(--color-cream-light)", letterSpacing: "1px" }}>
                  {t.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 pb-12" style={{ paddingLeft: "235px", paddingRight: "235px" }}>
          <button style={{ color: "var(--color-brown)" }}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M17 6H0M6 1L0 6l6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {Array.from({ length: 10 }, (_, i) => (
            <button
              key={i}
              style={{
                fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 400,
                color: i === 0 ? "var(--color-ink)" : "var(--color-ink)",
                opacity: i === 0 ? 1 : 0.5,
                textDecoration: i === 0 ? "underline" : "none",
              }}
            >
              {i + 1}
            </button>
          ))}
          <button style={{ color: "var(--color-brown)" }}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M0 6h17M11 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
