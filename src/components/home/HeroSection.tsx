"use client";

import { useState } from "react";
import { Countdown } from "@/components/ui/Countdown";
import { motion, type Variants } from "framer-motion";

const CITIES = ["Prešov", "Košice", "Bardejov"] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

interface VCHEvent {
  date: Date;
  title: string;
  slug: string;
}

interface Props {
  vchByCity?: Record<string, VCHEvent>;
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
      {/* Background photo */}
      <div className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundPosition: "72% 8%" }} />
      <div className="absolute inset-0" style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #1c1d1e 16%, transparent 73%)", mixBlendMode: "multiply" }} />

      {/* Social icons */}
      <div className="absolute flex flex-col items-center z-20" style={{ right: "108px", top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
        <div className="flex flex-col items-center" style={{ gap: "20px", padding: "24px 0" }}>
          {[
            { label: "Facebook", icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />, fill: true },
            { label: "YouTube", icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1c1d1e" /></>, fill: true },
          ].map(({ label, icon, fill }) => (
            <a key={label} href="#" aria-label={label}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ width: "29px", height: "29px", border: "1px solid rgba(253,245,242,0.6)", borderRadius: "4px", color: "#fdf5f2" }}>
              <svg width="14" height="14" fill={fill ? "currentColor" : "none"} stroke={fill ? undefined : "currentColor"} strokeWidth="1.8" viewBox="0 0 24 24">
                {icon}
              </svg>
            </a>
          ))}
        </div>
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col" style={{ paddingLeft: "235px", paddingRight: "235px", minHeight: "990px" }}>
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

        {/* ── VCH Block — rounded, with city switcher ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "1044px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
        >
          {/* Photo strip */}
          <div className="relative overflow-hidden" style={{ height: "200px" }}>
            <div className="absolute inset-0 bg-cover" style={{ backgroundImage: "url('/images/countdown-bg.jpg')", backgroundPosition: "center 20%", filter: "grayscale(100%)" }} />
            <div className="absolute inset-0 bg-black/55" />

            {/* City tabs — top right of photo */}
            <div className="absolute top-4 right-6 flex gap-2">
              {CITIES.map(city => {
                const hasEvent = !!vchByCity[city];
                const active = city === selectedCity;
                return (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "50px",
                      border: `1px solid ${active ? "#bea055" : "rgba(253,245,242,0.4)"}`,
                      backgroundColor: active ? "#bea055" : "rgba(0,0,0,0.3)",
                      fontFamily: "var(--font-commissioner)",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: active ? "#fdf5f2" : "rgba(253,245,242,0.7)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      opacity: hasEvent ? 1 : 0.4,
                    }}
                  >
                    {city}
                  </button>
                );
              })}
            </div>

            {/* Title */}
            <div className="absolute inset-x-0 bottom-0 h-[76px] flex items-center justify-center"
              style={{ backgroundColor: "rgba(28,29,30,0.92)", backdropFilter: "blur(4px)" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "2.4rem", fontWeight: 700, color: "#fdf5f2", letterSpacing: "0.15em" }}>
                NAJBLIŽŠÍ VEČER CHVÁL
              </span>
            </div>
          </div>

          {/* Bottom strip — date + city label */}
          <div className="flex items-center justify-between px-10 py-5"
            style={{ backgroundColor: "var(--color-beige-light, #f9f0e4)" }}>
            <div className="flex items-center gap-4">
              {/* Animated city label */}
              <motion.span
                key={selectedCity}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#bea055" }}
              >
                {selectedCity}
              </motion.span>
              <div style={{ width: "1px", height: "20px", backgroundColor: "#bea055", opacity: 0.4 }} />
              {/* Date */}
              <motion.span
                key={selectedCity + "date"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: "var(--font-inter)", fontSize: "18px", color: "#1c1d1e" }}
              >
                {targetDate ? formatDate(targetDate) : "Čoskoro"}
              </motion.span>
            </div>
            <a href="/udalosti/vecer-chval"
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#977d3e" }}>
              Zobraziť všetky →
            </a>
          </div>

          {/* Countdown */}
          <div style={{ backgroundColor: "var(--color-beige-light, #f9f0e4)", paddingBottom: "24px", paddingLeft: "40px" }}>
            <div style={{ height: "1px", backgroundColor: "rgba(190,160,85,0.2)", marginBottom: "20px", marginRight: "40px" }} />
            {targetDate ? (
              <Countdown targetDate={targetDate} />
            ) : (
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "#635f5b", paddingBottom: "8px" }}>
                Termín bude čoskoro oznámený.
              </p>
            )}
          </div>
        </motion.div>

        <div style={{ height: "40px" }} />
      </div>
    </section>
  );
}
