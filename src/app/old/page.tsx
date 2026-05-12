"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { AktualitySection } from "@/components/home/AktualitySection";
import { ONasSection } from "@/components/home/ONasSection";
import { MisieSection } from "@/components/home/MisieSection";
import { ArchivSection } from "@/components/home/ArchivSection";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { KontaktSection } from "@/components/home/KontaktSection";

// ── Страница сравнения: оригинальный дизайн Figma ──

function calcTime(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
    m: Math.floor((diff / (1000 * 60)) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

const PRESOV_DATE = new Date("2026-05-23T19:00:00");

function OldCountdown() {
  const [t, setT] = useState(calcTime(PRESOV_DATE));
  useEffect(() => {
    const id = setInterval(() => setT(calcTime(PRESOV_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-[30px]">
      {[{ v: t.d, l: "dní" }, { v: t.h, l: "hodín" }, { v: t.m, l: "minút" }, { v: t.s, l: "sekúnd" }].map(({ v, l }) => (
        <div key={l} style={{ width: "108px", height: "108px", backgroundColor: "#bea055", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
          <AnimatePresence mode="wait">
            <motion.span key={String(v).padStart(2, "0")} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "2rem", fontWeight: 700, color: "#fdf5f2" }}>
              {String(v).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "1rem", color: "rgba(253,245,242,0.7)" }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

export default function OldPage() {
  return (
    <>
      {/* Comparison badge */}
      <div style={{ position: "fixed", top: "16px", left: "50%", transform: "translateX(-50%)", zIndex: 9998, backgroundColor: "rgba(28,29,30,0.92)", border: "1px solid rgba(190,160,85,0.4)", borderRadius: "50px", padding: "7px 22px", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#bea055", letterSpacing: "2px" }}>
          PÔVODNÝ NÁVRH
        </span>
        <span style={{ width: "1px", height: "12px", backgroundColor: "rgba(253,245,242,0.2)" }} />
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(253,245,242,0.5)" }}>
          Nový návrh → <a href="/" style={{ color: "#bea055" }}>marana-tha.vercel.app</a>
        </span>
      </div>

      <main>
        {/* ── HERO — Figma: 1512×990px ── */}
        <section style={{ position: "relative", overflow: "hidden", backgroundColor: "#1c1d1e", minHeight: "990px" }}>
          {/* Background photo */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "72% 8%" }} />
          {/* Colour-burn warm overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
          {/* Dark gradient multiply */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #1c1d1e 16%, transparent 73%)", mixBlendMode: "multiply" }} />

          {/* Figma Navbar — simple, original style */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "235px", paddingRight: "235px", paddingTop: "32px" }}>
            <Image src="/images/logo.png" alt="Marana Tha" width={100} height={62} style={{ height: "62px", width: "auto", filter: "brightness(0) invert(1)" }} />
            <nav style={{ display: "flex", gap: "40px" }}>
              {["O nás", "Aktivity", "Udalosti", "Kde sme", "Kontakt"].map(item => (
                <span key={item} style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 400, color: "rgba(253,245,242,0.85)", cursor: "pointer" }}>{item}</span>
              ))}
            </nav>
            <a href="/pridaj-sa" style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#fdf5f2", border: "1px solid rgba(253,245,242,0.5)", borderRadius: "50px", padding: "10px 28px" }}>
              Pridaj sa
            </a>
          </div>

          {/* Content — starts at y=417 from section top (Figma) */}
          <div style={{ position: "relative", zIndex: 10, paddingLeft: "235px", paddingRight: "235px", minHeight: "990px", display: "flex", flexDirection: "column" }}>
            <div style={{ height: "417px", flexShrink: 0 }} />

            {/* Bible quote + CTA — Figma: left-aligned, maxWidth 560px */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "560px", paddingBottom: "99px" }}>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 400, color: "#fdf5f2", lineHeight: "39px", width: "425px" }}>
                „Lebo kde sú dvaja alebo traja<br />v mojom mene,<br />tam som ja medzi nimi."
              </motion.p>

              {/* Gold divider — Figma: 700×1 #bea055 */}
              <div style={{ height: "1px", width: "700px", backgroundColor: "#bea055" }} />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 400, color: "rgba(253,245,242,0.9)", lineHeight: "25px", width: "559px" }}>
                Spoločenstvo Marana Tha je katolícke spoločenstvo detí, mládeže a dospelých, ktorí chcú prežívať živé kresťanstvo a deliť sa s inými so živou vierou.
              </motion.p>

              <a href="/kontakt" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50px", border: "1px solid rgba(253,245,242,0.7)", padding: "12px 40px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", width: "fit-content" }}>
                Kontaktovať
              </a>
            </div>

            {/* VCH Block — Figma: 1044px wide, rectangular */}
            <div style={{ width: "1044px" }}>
              {/* Photo with dark overlay + "NAJBLIŽŠÍ VEČER CHVÁL" band */}
              <div style={{ height: "243px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/countdown-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center 20%", filter: "grayscale(100%)" }} />
                <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" }} />
                {/* Title band at bottom */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "84px", backgroundColor: "rgba(41,41,41,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "3rem", fontWeight: 700, color: "#fdf5f2", letterSpacing: "0.15em" }}>NAJBLIŽŠÍ VEČER CHVÁL</span>
                </div>
              </div>

              {/* Date row — Figma: #f9f0e4 strip, 105px high */}
              <div style={{ height: "105px", backgroundColor: "#f9f0e4", display: "flex", alignItems: "center", paddingLeft: "260px" }}>
                <div style={{ border: "1px solid rgba(28,29,30,0.35)", borderRadius: "50px", padding: "6px 32px" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "20px", color: "#1c1d1e" }}>23. mája 2026</span>
                </div>
              </div>

              {/* Countdown */}
              <div style={{ height: "65px", backgroundColor: "#f9f0e4" }} />
              <div style={{ paddingLeft: "260px", backgroundColor: "#f9f0e4", paddingBottom: "48px" }}>
                <OldCountdown />
              </div>
            </div>
          </div>
        </section>
        {/* All sections below — same as homepage */}
        <AktualitySection />
        <ONasSection />
        <MisieSection />
        <ArchivSection />
        <PodporteNasSection />
        <NewsletterSection />
        <KontaktSection />
      </main>
      <Footer />
    </>
  );
}
