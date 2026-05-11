"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ── Original Figma-based design for comparison ──

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
            <motion.span key={String(v).padStart(2,"0")} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "2rem", color: "#fdf5f2" }}>
              {String(v).padStart(2,"0")}
            </motion.span>
          </AnimatePresence>
          <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "1.25rem", color: "#fdf5f2" }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

export default function OldPage() {
  return (
    <>
      <Navbar />
      {/* Badge */}
      <div style={{ position: "fixed", top: "12px", left: "50%", transform: "translateX(-50%)", zIndex: 9998, backgroundColor: "rgba(28,29,30,0.9)", border: "1px solid rgba(190,160,85,0.4)", borderRadius: "50px", padding: "6px 20px", backdropFilter: "blur(8px)" }}>
        <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#bea055", letterSpacing: "2px" }}>
          PÔVODNÝ NÁVRH
        </span>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(253,245,242,0.5)", marginLeft: "12px" }}>
          Nový návrh → <a href="/" style={{ color: "#bea055" }}>marana-tha.vercel.app</a>
        </span>
      </div>

      <main>
        {/* Original Hero — Figma design */}
        <section className="relative overflow-hidden bg-[#1c1d1e]" style={{ minHeight: "990px" }}>
          <div className="absolute inset-0 bg-cover" style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundPosition: "72% 8%" }} />
          <div className="absolute inset-0" style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1c1d1e 16%, transparent 73%)", mixBlendMode: "multiply" }} />

          <div className="relative z-10 flex flex-col" style={{ paddingLeft: "235px", paddingRight: "235px", minHeight: "990px" }}>
            <div style={{ height: "417px", flexShrink: 0 }} />

            {/* Quote + CTA — original left-aligned layout */}
            <div className="flex flex-col gap-5" style={{ maxWidth: "560px", paddingBottom: "99px" }}>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 400, color: "#fdf5f2", lineHeight: "39px", width: "425px" }}>
                „Lebo kde sú dvaja alebo traja<br />v mojom mene,<br />tam som ja medzi nimi."
              </motion.p>
              <div style={{ height: "1px", width: "700px", backgroundColor: "#bea055" }} />
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 400, color: "rgba(253,245,242,0.9)", lineHeight: "25px", width: "559px" }}>
                Spoločenstvo Marana Tha je katolícke spoločenstvo detí, mládeže a dospelých, ktorí chcú prežívať živé kresťanstvo a deliť sa s inými so živou vierou.
              </motion.p>
              <a href="/kontakt" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50px", border: "1px solid rgba(253,245,242,0.7)", padding: "12px 40px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", width: "fit-content" }}>
                Kontaktovať
              </a>
            </div>

            {/* Original VCH — rectangular */}
            <div style={{ width: "1044px" }}>
              <div style={{ height: "243px", backgroundImage: "url('/images/countdown-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center 20%", filter: "grayscale(100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", inset: "0 0 0 0", bottom: 0, height: "84px", backgroundColor: "rgba(41,41,41,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "3rem", fontWeight: 700, color: "#fdf5f2", letterSpacing: "0.15em" }}>NAJBLIŽŠÍ VEČER CHVÁL</span>
                </div>
              </div>
              <div style={{ height: "105px", backgroundColor: "#f9f0e4", display: "flex", alignItems: "center", paddingLeft: "260px" }}>
                <div style={{ border: "1px solid rgba(28,29,30,0.4)", borderRadius: "50px", padding: "6px 32px" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "20px", color: "#1c1d1e" }}>23. mája 2026</span>
                </div>
              </div>
              <div style={{ height: "65px", backgroundColor: "#f9f0e4" }} />
              <div style={{ paddingLeft: "260px", backgroundColor: "#f9f0e4", paddingBottom: "40px" }}>
                <OldCountdown />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
