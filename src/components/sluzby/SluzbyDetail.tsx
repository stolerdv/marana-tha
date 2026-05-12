"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import type { Sluzba } from "@/lib/sluzby";

// Figma frame 9 (@12017,263) 1512×6170. Content left=12252.
//
// "udalosti | stretnutia" section (y_rel = abs_y-263):
//   Watermark 100px: above y=1351
//   Subtitle 50px gold-dark: ~y=1165-1202 range
//   Gold dividers 1044×1: y=1351, 1451, 1551 (100px apart)
//   Events: Commissioner 700/400 30px lh=55px, 2-col (type | date)
//
// "galéria" section (Group 95 starts y=1995-263=1732):
//   Watermark "galéria" 100px
//   Subtitle "galéria" 50px gold-dark
//   White card 1044×1044 r=17: y=1949
//   Inside: 9 photos 312×312 r=15, gap=22px, padding=32px
//   Progress indicator at bottom
//
// "kontaktná osoba" section:
//   Watermark "kontaktná osoba" 100px
//   Subtitle "Kontaktná osoba" 50px gold-dark
//   Person card 174×310 r=15 white: y=3463
//   Contact info: Commissioner 700 30px lh=55px
//   "Neváhaj nás kontaktovať": Commissioner 700 70px #bea055

interface SluzbyDetailProps {
  sluzba: Sluzba;
}

const PLACEHOLDER_PHOTOS = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/gallery-${i + 1}.jpg`,
  alt: `Fotografia ${i + 1}`,
}));

export function SluzbyDetail({ sluzba }: SluzbyDetailProps) {
  const photos = sluzba.gallery.length >= 9 ? sluzba.gallery : PLACEHOLDER_PHOTOS;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — frame at y=263 → titleTop=467 */}
        <PageHero
          title={sluzba.title}
          description={sluzba.description}
          image={sluzba.heroImage}
          titleTop={467}
        />

        {/* ── UDALOSTI | STRETNUTIA section ── */}
        <section className="relative bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
          {/* Watermark */}
          <div className="absolute pointer-events-none select-none"
            style={{ top: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-commissioner)", fontSize: "100px", fontWeight: 700, letterSpacing: "10px", color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", whiteSpace: "nowrap" }}>
            udalosti | stretnutia
          </div>

          <div className="relative px-4 sm:px-8 lg:px-[235px]">
            {/* Subtitle */}
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "40px" }}>
              udalosti | stretnutia
            </p>

            {/* Events table — gold dividers, 2 cols: type (700) + date (400) */}
            <div className="flex flex-col">
              {sluzba.events.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  {/* Gold divider — Figma: 1044×1 #bea055 */}
                  <div style={{ height: "1px", backgroundColor: "#bea055", width: "100%" }} />
                  <div className="flex items-start" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                    {/* Type — Figma: Commissioner 700 30px lh=55px #1c1d1e */}
                    <div style={{ width: "360px", flexShrink: 0 }}>
                      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e" }}>
                        {event.type}
                      </span>
                    </div>
                    {/* Date — Figma: Commissioner 400 30px lh=55px #1c1d1e */}
                    <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 400, lineHeight: "55px", color: "#1c1d1e" }}>
                      {event.date}
                    </span>
                  </div>
                </motion.div>
              ))}
              {/* Final divider */}
              <div style={{ height: "1px", backgroundColor: "#bea055", width: "100%" }} />
            </div>
          </div>
        </section>

        {/* ── GALÉRIA section ── */}
        <section className="relative bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          {/* Watermark */}
          <div className="absolute pointer-events-none select-none"
            style={{ top: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-commissioner)", fontSize: "100px", fontWeight: 700, letterSpacing: "10px", color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", whiteSpace: "nowrap" }}>
            galéria
          </div>

          <div className="relative px-4 sm:px-8 lg:px-[235px]">
            {/* Subtitle */}
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
              galéria
            </p>

            {/* White gallery card — Figma: Rectangle 87 1044×1044 r=17 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white"
              style={{ width: "1044px", borderRadius: "17px", padding: "32px" }}
            >
              {/* 3×3 photo grid — Figma: each photo 312×312 r=15, gap=22px, padding=32px */}
              {/* Group 72: 980×980 within card, 3 cols × 312px + 2×22px gap = 980px ✓ */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 312px)",
                  gridTemplateRows: "repeat(3, 312px)",
                  gap: "22px",
                }}
              >
                {photos.slice(0, 9).map((photo, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden"
                    style={{ width: "312px", height: "312px", borderRadius: "15px", backgroundColor: "#e6ded5" }}
                  >
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Progress indicator — Figma: Group 38 (line 616×1 + thick 139×5 #6f6c6b) */}
              <div className="flex items-center" style={{ marginTop: "32px" }}>
                <div style={{ width: "139px", height: "5px", backgroundColor: "#6f6c6b" }} />
                <div style={{ flex: 1, height: "1px", backgroundColor: "#6f6c6b" }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── KONTAKTNÁ OSOBA section ── */}
        <section className="relative bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          {/* Watermark */}
          <div className="absolute pointer-events-none select-none"
            style={{ top: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-commissioner)", fontSize: "100px", fontWeight: 700, letterSpacing: "10px", color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", whiteSpace: "nowrap" }}>
            kontaktná osoba
          </div>

          <div className="relative px-4 sm:px-8 lg:px-[235px]">
            {/* Subtitle */}
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
              Kontaktná osoba
            </p>

            <div className="flex gap-16 items-start">
              {/* Person card — Figma: Group 76, 174×310 white r=15 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white shrink-0"
                style={{ width: "174px", height: "310px", borderRadius: "15px", overflow: "hidden" }}
              >
                {/* Photo — Figma: image 18, 106×125, r=15, y=11 from card top */}
                <div
                  className="relative overflow-hidden"
                  style={{ margin: "11px auto 0", width: "106px", height: "125px", borderRadius: "15px", backgroundColor: "#e6ded5" }}
                >
                  {sluzba.contact.photo && (
                    <Image src={sluzba.contact.photo} alt={sluzba.contact.name} fill className="object-cover" />
                  )}
                </div>
                {/* Name — Figma: Inter 400 22px lh=31.9px #000000 */}
                <div style={{ padding: "12px 24px 0" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "22px", fontWeight: 400, lineHeight: "31.9px", color: "#000000", margin: 0 }}>
                    {sluzba.contact.name}
                  </p>
                </div>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col gap-0"
              >
                {/* Phone — Figma: Commissioner 700 30px lh=55px #1c1d1e */}
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", margin: 0 }}>
                  Tel. č. : {sluzba.contact.phone}
                </p>
                {/* Email */}
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", margin: 0 }}>
                  e-mail: {sluzba.contact.email}
                </p>

                {/* "Neváhaj nás kontaktovať" — Figma: Commissioner 700 70px #bea055 */}
                <p
                  style={{
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "70px",
                    fontWeight: 700,
                    color: "#bea055",
                    lineHeight: "1.2",
                    marginTop: "40px",
                    margin: "40px 0 0",
                  }}
                >
                  Neváhaj nás kontaktovať
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
