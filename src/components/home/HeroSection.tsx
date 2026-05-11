"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const CITIES = ["Prešov", "Košice", "Bardejov"] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

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
    <div className="flex items-end gap-0">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-end">
          <div className="flex flex-col items-center" style={{ minWidth: "100px" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={String(u.value).padStart(2, "0")}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "var(--font-commissioner)",
                  fontSize: "68px",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "#fdf5f2",
                  letterSpacing: "-2px",
                  display: "block",
                }}
              >
                {String(u.value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span style={{
              fontFamily: "var(--font-commissioner)",
              fontSize: "13px",
              fontWeight: 400,
              color: "rgba(253,245,242,0.5)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginTop: "6px",
            }}>
              {u.label}
            </span>
          </div>
          {/* Separator */}
          {i < 3 && (
            <span style={{
              fontFamily: "var(--font-commissioner)",
              fontSize: "48px",
              fontWeight: 300,
              color: "rgba(190,160,85,0.5)",
              lineHeight: 1,
              marginBottom: "24px",
              padding: "0 4px",
            }}>:</span>
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
    <section className="relative overflow-hidden bg-[var(--color-ink)]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundPosition: "72% 8%" }} />
      <div className="absolute inset-0" style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #1c1d1e 16%, transparent 73%)", mixBlendMode: "multiply" }} />

      {/* Social icons */}
      <div className="absolute flex flex-col items-center z-20"
        style={{ right: "108px", top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
        <div className="flex flex-col items-center" style={{ gap: "20px", padding: "24px 0" }}>
          {["Facebook", "YouTube", "Instagram"].map((name) => (
            <a key={name} href="#" aria-label={name}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ width: "29px", height: "29px", border: "1px solid rgba(253,245,242,0.6)", borderRadius: "4px", color: "#fdf5f2" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                {name === "Facebook" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                {name === "YouTube" && <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />}
                {name === "Instagram" && <><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="0.8" /></>}
              </svg>
            </a>
          ))}
        </div>
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col"
        style={{ paddingLeft: "235px", paddingRight: "235px", minHeight: "990px" }}>
        <div style={{ height: "417px", flexShrink: 0 }} />

        {/* Quote + CTA */}
        <div className="max-w-[560px] flex flex-col gap-5" style={{ paddingBottom: "60px" }}>
          <motion.p custom={0} initial="hidden" animate="show" variants={fadeUp}
            style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 400, color: "var(--color-cream-light)", lineHeight: "39px", width: "425px" }}>
            „Lebo kde sú dvaja alebo traja<br />v mojom mene,<br />tam som ja medzi nimi."
          </motion.p>
          <motion.div custom={0.5} initial="hidden" animate="show" variants={fadeUp}
            style={{ height: "1px", width: "700px", backgroundColor: "#bea055" }} />
          <motion.p custom={1} initial="hidden" animate="show" variants={fadeUp}
            style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 400, color: "rgba(253,245,242,0.9)", lineHeight: "25px", width: "559px" }}>
            Spoločenstvo Marana Tha je katolícke spoločenstvo detí, mládeže a dospelých, ktorí chcú prežívať živé kresťanstvo.
          </motion.p>
          <motion.div custom={2} initial="hidden" animate="show" variants={fadeUp}>
            <a href="/kontakt"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-cream-light)] px-10 py-3 font-[family-name:var(--font-commissioner)] text-[0.9375rem] font-bold text-[var(--color-cream-light)] hover:bg-[var(--color-cream-light)]/10 transition-colors">
              Kontaktovať
            </a>
          </motion.div>
        </div>

        {/* ── VCH Block — fully dark, premium ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "1044px",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(135deg, rgba(28,29,30,0.97) 0%, rgba(40,35,28,0.97) 100%)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(190,160,85,0.2)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(190,160,85,0.15)",
          }}
        >
          {/* Subtle bg texture */}
          <div className="absolute inset-0 bg-cover opacity-15"
            style={{ backgroundImage: "url('/images/countdown-bg.jpg')", backgroundPosition: "center 20%", filter: "grayscale(100%)" }} />

          <div className="relative" style={{ padding: "36px 44px 40px" }}>
            {/* Top row: label + city tabs */}
            <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
              <span style={{
                fontFamily: "var(--font-commissioner)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#bea055",
              }}>
                Najbližší večer chvál
              </span>

              {/* City tabs */}
              <div className="flex gap-2">
                {CITIES.map(city => {
                  const active = city === selectedCity;
                  const hasEvent = !!vchByCity[city];
                  return (
                    <button key={city} onClick={() => setSelectedCity(city)}
                      style={{
                        padding: "7px 20px",
                        borderRadius: "50px",
                        border: `1px solid ${active ? "#bea055" : "rgba(253,245,242,0.2)"}`,
                        backgroundColor: active ? "#bea055" : "transparent",
                        fontFamily: "var(--font-commissioner)",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: active ? "#1c1d1e" : "rgba(253,245,242,0.6)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        opacity: hasEvent ? 1 : 0.35,
                      }}>
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gold divider */}
            <div style={{ height: "1px", background: "linear-gradient(to right, #bea055, rgba(190,160,85,0.1))", marginBottom: "28px" }} />

            {/* Date */}
            <AnimatePresence mode="wait">
              <motion.div key={selectedCity}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: "32px" }}>
                <p style={{
                  fontFamily: "var(--font-commissioner)",
                  fontSize: "34px",
                  fontWeight: 700,
                  color: "#fdf5f2",
                  lineHeight: 1,
                }}>
                  {targetDate ? formatDate(targetDate) : "Termín bude oznámený"}
                  {targetDate && (
                    <span style={{ fontSize: "18px", color: "rgba(253,245,242,0.4)", marginLeft: "16px", fontWeight: 400 }}>
                      · {selectedCity}
                    </span>
                  )}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Countdown */}
            <div className="flex items-end justify-between">
              {targetDate ? (
                <DarkCountdown target={targetDate} />
              ) : (
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "rgba(253,245,242,0.4)" }}>
                  Čoskoro
                </p>
              )}
              <a href="/udalosti/vecer-chval"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#bea055", paddingBottom: "8px" }}>
                Zobraziť všetky
                <svg width="32" height="8" viewBox="0 0 32 8" fill="none">
                  <path d="M0 4h28M24 1l4 3-4 3" stroke="#bea055" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        <div style={{ height: "48px" }} />
      </div>
    </section>
  );
}
