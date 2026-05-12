"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const cities = [
  {
    name: "Prešov",
    href: "/spolocenstvo/presov",
    address: "Švábska 22, 080 05 Prešov",
    email: "info@maranathapo.sk",
    color: "#bea055",
  },
  {
    name: "Košice",
    href: "/spolocenstvo/kosice",
    address: "Kontaktujte nás pre adresu",
    email: "info@maranathapo.sk",
    color: "#4a7c9b",
  },
  {
    name: "Bardejov",
    href: "/spolocenstvo/bardejov",
    address: "Kontaktujte nás pre adresu",
    email: "info@maranathapo.sk",
    color: "#6b8a5e",
  },
];

export function KontaktSection() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden pb-0">
      <div className="max-w-[1512px] mx-auto px-4 sm:px-8 lg:px-[235px]">

        {/* Watermark — desktop only */}
        <div className="hidden lg:flex relative justify-center pointer-events-none select-none pt-12 mb-4">
          <div style={{ fontSize: "100px", fontFamily: "var(--font-commissioner)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", letterSpacing: "-2px", whiteSpace: "nowrap" }}>
            KONTAKT
          </div>
        </div>

        <div className="pt-10 lg:pt-0 pb-16">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mb-12"
          >
            <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(36px,4vw,50px)", fontWeight: 400, color: "var(--color-gold-dark)", display: "block", marginBottom: "8px" }}>
              kontakt
            </span>
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(16px,2vw,20px)", color: "rgba(28,29,30,0.55)", maxWidth: "480px" }}>
              Nájdi nás v troch mestách na východnom Slovensku.
            </p>
          </motion.div>

          {/* 3 city cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
              >
                <Link href={city.href} className="block group">
                  <div className="rounded-[16px] p-6 transition-all duration-300 group-hover:shadow-lg" style={{ backgroundColor: "#fff", border: "1px solid rgba(190,160,85,0.2)" }}>
                    {/* City badge */}
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: city.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: city.color }}>
                        {city.name}
                      </span>
                    </div>

                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#1c1d1e", lineHeight: 1.6, marginBottom: "12px" }}>
                      {city.address}
                    </p>
                    <a href={`mailto:${city.email}`} style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#977d3e" }}>
                      {city.email}
                    </a>

                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: city.color }}>
                      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700 }}>Zobraziť viac</span>
                      <svg width="14" height="7" viewBox="0 0 14 7" fill="none"><path d="M0 3.5h11M8 1l3 2.5L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <Link href="/kontakt"
              className="inline-flex items-center gap-3 rounded-full transition-colors hover:bg-[#977d3e]"
              style={{ backgroundColor: "var(--color-gold)", color: "var(--color-cream-light)", padding: "14px 32px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700 }}>
              Všetky kontakty →
            </Link>
          </motion.div>
        </div>

        {/* Gold divider line */}
        <div style={{ height: "1px", backgroundColor: "var(--color-gold)", width: "100%" }} />
      </div>
    </section>
  );
}
