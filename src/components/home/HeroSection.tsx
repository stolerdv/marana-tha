"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CITIES = ["Prešov", "Košice", "Bardejov"] as const;

interface VCHEvent { date: Date; title: string; slug: string; }
interface Props { vchByCity?: Record<string, VCHEvent>; }

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

function DarkCountdown({ target }: { target: Date }) {
  const [t, setT] = useState(calcTime(target));
  useEffect(() => {
    const id = setInterval(() => setT(calcTime(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { value: t.d, label: "dní" },
    { value: t.h, label: "hodín" },
    { value: t.m, label: "minút" },
    { value: t.s, label: "sekúnd" },
  ];

  return (
    <div className="flex items-end">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-end">
          <div className="flex flex-col items-center" style={{ minWidth: "88px" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={String(u.value).padStart(2, "0")}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "56px", fontWeight: 300, lineHeight: 1, color: "#fdf5f2", letterSpacing: "-2px", display: "block" }}
              >
                {String(u.value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "11px", fontWeight: 400, color: "rgba(253,245,242,0.45)", textTransform: "uppercase", letterSpacing: "2px", marginTop: "4px" }}>
              {u.label}
            </span>
          </div>
          {i < 3 && (
            <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "40px", fontWeight: 300, color: "rgba(190,160,85,0.45)", lineHeight: 1, marginBottom: "20px", padding: "0 2px" }}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}


export function HeroSection({ vchByCity = {} }: Props) {
  const [selectedCity, setSelectedCity] = useState<string>("Prešov");
  const currentEvent = vchByCity[selectedCity];
  const targetDate = currentEvent ? new Date(currentEvent.date) : null;

  function formatDate(d: Date) {
    return d.toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <section className="relative" style={{ minHeight: "100vh", backgroundColor: "#1c1d1e", zIndex: 10 }}>
      {/* Clipping wrapper for bg layers only — does not clip VCH card */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundPosition: "72% 20%" }} />
        {/* Warm colour-burn layer — restores amber/orange tones from original */}
        <div className="absolute inset-0"
          style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
        {/* Dark gradient */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #1c1d1e 12%, transparent 60%, rgba(28,29,30,0.7) 85%, rgba(28,29,30,0.97) 100%)", mixBlendMode: "multiply" }} />
      </div>

      {/* Social icons — right edge */}
      <div className="absolute flex flex-col items-center z-20" style={{ right: "56px", top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ width: "1px", height: "80px", backgroundColor: "rgba(253,245,242,0.25)" }} />
        <div className="flex flex-col items-center" style={{ gap: "16px", padding: "20px 0" }}>
          {["Facebook", "YouTube", "Instagram"].map((name) => (
            <a key={name} href="#" aria-label={name}
              className="flex items-center justify-center hover:opacity-100 transition-opacity"
              style={{ width: "32px", height: "32px", border: "1px solid rgba(253,245,242,0.3)", borderRadius: "6px", color: "rgba(253,245,242,0.6)", opacity: 0.7 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                {name === "Facebook" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                {name === "YouTube" && <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />}
                {name === "Instagram" && <><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="0.8" /></>}
              </svg>
            </a>
          ))}
        </div>
        <div style={{ width: "1px", height: "80px", backgroundColor: "rgba(253,245,242,0.25)" }} />
      </div>

      {/* ── MAIN CONTENT — positioned in lower half of hero ── */}
      <div className="relative z-10 flex flex-col items-center text-center"
        style={{ paddingLeft: "235px", paddingRight: "235px", paddingTop: "38vh", paddingBottom: "60px" }}>

        {/* Main quote */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-commissioner)",
            fontSize: "clamp(36px, 4.2vw, 62px)",
            fontWeight: 700,
            color: "#fdf5f2",
            lineHeight: 1.1,
            maxWidth: "760px",
            marginBottom: "28px",
            letterSpacing: "-1px",
          }}
        >
          Miesto stretnutí,<br />
          <span style={{ color: "#bea055" }}>modlitieb</span> a chvál.
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "60px", height: "2px", backgroundColor: "#bea055", marginBottom: "28px", transformOrigin: "center" }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-commissioner)",
            fontSize: "19px",
            fontWeight: 400,
            color: "rgba(253,245,242,0.75)",
            lineHeight: "1.6",
            maxWidth: "520px",
            marginBottom: "36px",
          }}
        >
          Katolícke spoločenstvo v Prešove, Bardejove a Košiciach. Príď, spoznaj nás a prežívaj živú vieru spoločne s nami.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-4"
        >
          <Link href="/pridaj-sa"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "#bea055", color: "#1c1d1e",
              borderRadius: "50px", padding: "16px 36px",
              fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700,
            }}>
            Pridaj sa k nám
          </Link>
          <Link href="/udalosti"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "transparent", color: "#fdf5f2",
              border: "1px solid rgba(253,245,242,0.4)",
              borderRadius: "50px", padding: "16px 36px",
              fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 400,
            }}>
            Najbližšie udalosti
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ marginTop: "16px" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(253,245,242,0.3)" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* ── VCH Block — floats deep into next section ── */}
      <div className="relative z-20" style={{ paddingLeft: "235px", paddingRight: "235px", marginBottom: "-260px" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(160deg, #12110f 0%, #1e1910 100%)",
            border: "1px solid rgba(190,160,85,0.25)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* B&W photo background inside card */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/countdown-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
              filter: "grayscale(100%)",
              opacity: 0.12,
            }}
          />
          <div style={{ padding: "28px 40px 32px" }}>
            {/* Top: label + city tabs */}
            <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
              <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "11px", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(190,160,85,0.7)" }}>
                Najbližší večer chvál
              </span>
              <div className="flex gap-2">
                {CITIES.map(city => {
                  const active = city === selectedCity;
                  const hasEvent = !!vchByCity[city];
                  return (
                    <button key={city} onClick={() => setSelectedCity(city)}
                      style={{
                        padding: "6px 18px", borderRadius: "50px",
                        border: `1px solid ${active ? "#bea055" : "rgba(253,245,242,0.15)"}`,
                        backgroundColor: active ? "#bea055" : "transparent",
                        fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700,
                        color: active ? "#1c1d1e" : "rgba(253,245,242,0.5)",
                        cursor: "pointer", transition: "all 0.2s",
                        opacity: hasEvent ? 1 : 0.3,
                      }}>
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gold divider */}
            <div style={{ height: "1px", background: "linear-gradient(to right, rgba(190,160,85,0.5), transparent)", marginBottom: "20px" }} />

            {/* Date + countdown */}
            <div className="flex items-end justify-between">
              <div>
                <AnimatePresence mode="wait">
                  <motion.p key={selectedCity}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#fdf5f2", marginBottom: "16px", lineHeight: 1 }}>
                    {targetDate ? formatDate(targetDate) : "Termín bude oznámený"}
                    {targetDate && <span style={{ fontSize: "15px", color: "rgba(253,245,242,0.35)", marginLeft: "12px", fontWeight: 400 }}>· {selectedCity}</span>}
                  </motion.p>
                </AnimatePresence>
                {targetDate ? <DarkCountdown target={targetDate} /> : (
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "rgba(253,245,242,0.3)" }}>Čoskoro</p>
                )}
              </div>
              <Link href="/udalosti/vecer-chval"
                className="hover:opacity-80 transition-opacity"
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#bea055", display: "flex", alignItems: "center", gap: "8px", paddingBottom: "4px" }}>
                Zobraziť všetky
                <svg width="28" height="8" viewBox="0 0 28 8" fill="none">
                  <path d="M0 4h24M20 1l4 3-4 3" stroke="#bea055" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
