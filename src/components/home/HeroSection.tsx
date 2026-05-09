"use client";

import { Countdown } from "@/components/ui/Countdown";
import { motion, type Variants } from "framer-motion";

const VECER_CHVAL_DATE = new Date("2026-03-29T19:00:00");

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)]">
      {/* Layer 1: Photo (100% opacity, as in Figma) */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundPosition: "72% 8%",
        }}
      />
      {/* Layer 2: Rectangle 1 — #dec4b0 with color-burn (Figma: LINEAR_BURN)
          This darkens warm orange tones in the photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#dec4b0",
          mixBlendMode: "color-burn",
        }}
      />
      {/* Layer 3: Rectangle 3 — gradient #1c1d1e→transparent with multiply (exact Figma values)
          Gradient: from top (fully opaque at ~16%) to transparent at ~73% */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #1c1d1e 16%, transparent 73%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Right side: social icons — absolute within hero ── */}
      <div className="absolute flex flex-col items-center z-20"
        style={{ right: "108px", top: "50%", transform: "translateY(-50%)" }}>

        {/* Top line */}
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />

        {/* Icons — Figma: 29×29px, white, border rgba(253,245,242,0.6) */}
        <div className="flex flex-col items-center" style={{ gap: "20px", padding: "24px 0" }}>
          <a href="#" aria-label="Facebook"
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ width: "29px", height: "29px", border: "1px solid rgba(253,245,242,0.6)", borderRadius: "4px", color: "#fdf5f2" }}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube"
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ width: "29px", height: "29px", border: "1px solid rgba(253,245,242,0.6)", borderRadius: "4px", color: "#fdf5f2" }}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1c1d1e" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram"
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ width: "29px", height: "29px", border: "1px solid rgba(253,245,242,0.6)", borderRadius: "4px", color: "#fdf5f2" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
          </a>
        </div>

        {/* Bottom line */}
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
      </div>

      {/* ── Hero content ── */}
      {/* Hero content — exact Figma positioning:
          section height=990px, content starts y=417, countdown y=849 */}
      <div className="relative z-10 flex flex-col" style={{ paddingLeft: "235px", paddingRight: "235px", minHeight: "990px" }}>

        {/* Spacer — Figma exact: quote at y=417 from section top */}
        <div style={{ height: "417px", flexShrink: 0 }} />

        {/* Quote + description + CTA */}
        <div className="max-w-[560px] flex flex-col gap-5" style={{ paddingBottom: "99px" }}>

          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-commissioner)",
              fontSize: "32px",
              fontWeight: 400,
              color: "var(--color-cream-light)",
              lineHeight: "39.136px",
              width: "425px",
              letterSpacing: "0",
            }}
          >
            <>„Lebo kde sú dvaja alebo traja<br />v mojom mene, <br />tam som ja medzi nimi."</>

          </motion.p>

          {/* Gold divider line — Figma: 700×1px #bea055 */}
          <motion.div
            custom={0.5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            style={{ height: "1px", width: "700px", backgroundColor: "#bea055" }}
          />

          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-commissioner)",
              fontSize: "20px",
              fontWeight: 400,
              color: "rgba(253,245,242,0.9)",
              lineHeight: "25px",
              width: "559px",
            }}
          >
            Spoločenstvo Marana Tha je katolícke spoločenstvo{" "}
            <br />detí, mládeže a dospelých, ktorí chcú prežívať živé kresťanstvo a deliť sa s inými so živou vierou. Je miestom stretnutí, modlitieb, chvál, formácie a evanjelizácie.
          </motion.p>

          <motion.div custom={2} initial="hidden" animate="show" variants={fadeUp}>
            {/* Oval/pill outlined button — as in Figma */}
            <a
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-cream-light)] px-10 py-3 font-[family-name:var(--font-commissioner)] text-[0.9375rem] font-bold text-[var(--color-cream-light)] hover:bg-[var(--color-cream-light)]/10 transition-colors"
            >
              Kontaktovať
            </a>
          </motion.div>
        </div>

        {/* ── Countdown strip — starts at y=849 (Figma exact) ── */}
        <div className="w-[1044px] relative">

          {/* Background photo strip — black & white, show musicians at top */}
          <div
            className="h-[243px] w-full bg-cover relative overflow-hidden"
            style={{
              backgroundImage: "url('/images/countdown-bg.jpg')",
              backgroundPosition: "center 20%",
              filter: "grayscale(100%)",
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Dark band with event title */}
            <div className="absolute inset-x-0 bottom-0 h-[84px] bg-[#292929]/95 flex flex-col items-center justify-center gap-1">
              <span className="font-[family-name:var(--font-inter)] text-[3.125rem] font-bold text-[var(--color-cream-light)] tracking-widest leading-none">
                NAJBLIŽŠÍ VEČER CHVÁL
              </span>
            </div>
          </div>

          {/* Beige date + countdown row */}
          <div className="h-[105px] w-full bg-[var(--color-beige-light)] relative flex items-center"
            style={{ paddingLeft: "260px" }}>

            {/* Date pill */}
            <div className="border border-[var(--color-ink)]/40 rounded-full px-8 py-1.5 mr-8">
              <span className="font-[family-name:var(--font-inter)] text-[1.25rem] font-normal text-[var(--color-ink)]">
                29. 3. 2026
              </span>
            </div>
          </div>

          {/* Gap between beige strip and countdown boxes — Figma: 65px */}
          <div style={{ height: "65px" }} />

          {/* Countdown boxes — Figma: x=260 from content left, below beige strip */}
          <div style={{ paddingLeft: "260px" }}>
            <Countdown targetDate={VECER_CHVAL_DATE} />
          </div>

          {/* Bottom padding after countdown */}
          <div style={{ height: "40px" }} />
        </div>
      </div>
    </section>
  );
}
