"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  description: string;
  image: string;
  // Vertical offset of title from section top — depends on frame's y position in Figma.
  // Frames at y=263 → titleTop=467. Frames at y=202 → titleTop=528.
  titleTop?: number;
}

// All hero elements are at the same ABSOLUTE y in Figma canvas:
//   title: y=730, gold line: y=827, description: y=939
// Section-relative positions = absolute_y - frame_top_y
// Frames at y=263: title=467, line=564, desc=676
// Frames at y=202: title=528, line=625, desc=737

export function PageHero({ title, description, image, titleTop = 467 }: PageHeroProps) {
  const lineTop = titleTop + 97;      // 827-730=97px after title
  const descTop = titleTop + 209;     // 939-730=209px after title

  return (
    <section className="relative overflow-hidden" style={{ height: "990px" }}>
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url('${image}')`, backgroundPosition: "center 30%" }}
      />
      {/* Colour-burn warm overlay #dec4b0 */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }}
      />
      {/* Dark gradient multiply */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #1c1d1e 16%, transparent 73%)", mixBlendMode: "multiply" }}
      />

      {/* Social icons — Figma: Group 5 right:108px from section right, ~57% from top */}
      <div
        className="absolute flex flex-col items-center z-20"
        style={{ right: "108px", top: "57%", transform: "translateY(-50%)" }}
      >
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
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
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
          </a>
        </div>
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
      </div>

      {/* Gold horizontal line — Figma: 700×1 #bea055, x=1px from section left */}
      <div
        className="absolute"
        style={{ left: "1px", top: `${lineTop}px`, width: "700px", height: "1px", backgroundColor: "#bea055" }}
      />

      {/* Page title — Figma: Commissioner 400 60px #fdf5f2 lh=73.4px, at content left */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute"
        style={{
          left: "235px",
          top: `${titleTop}px`,
          fontFamily: "var(--font-commissioner)",
          fontSize: "60px",
          fontWeight: 400,
          lineHeight: "73.4px",
          color: "#fdf5f2",
          letterSpacing: "0px",
        }}
      >
        {title}
      </motion.h1>

      {/* Description — Figma: Commissioner 400 20px #fdf5f2 lh=25px, 941px wide, at content left */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute"
        style={{
          left: "235px",
          top: `${descTop}px`,
          width: "941px",
          fontFamily: "var(--font-commissioner)",
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: "25px",
          color: "#fdf5f2",
        }}
      >
        {description}
      </motion.p>
    </section>
  );
}
