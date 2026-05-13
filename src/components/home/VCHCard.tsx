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
          <div className="flex flex-col items-center" style={{ minWidth: "clamp(56px, 12vw, 88px)" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={String(u.value).padStart(2, "0")}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 300, lineHeight: 1, color: "#fdf5f2", letterSpacing: "-2px", display: "block" }}
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

function formatDate(d: Date) {
  return d.toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
}

export function VCHCard({ vchByCity = {} }: Props) {
  const [selectedCity, setSelectedCity] = useState<string>("Prešov");
  const currentEvent = vchByCity[selectedCity];
  const targetDate = currentEvent ? new Date(currentEvent.date) : null;

  return (
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ marginBottom: "16px" }}>
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
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
  );
}
