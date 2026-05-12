"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  description: string;
  image: string;
  titleTop?: number;
}

export function PageHero({ title, description, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "clamp(460px, 70vh, 990px)" }}>
      {/* Background photo */}
      <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${image}')`, backgroundPosition: "center 30%" }} />
      <div className="absolute inset-0" style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1c1d1e 16%, transparent 73%)", mixBlendMode: "multiply" }} />

      {/* Social icons — desktop only */}
      <div className="hidden lg:flex absolute flex-col items-center z-20" style={{ right: "108px", top: "57%", transform: "translateY(-50%)" }}>
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
        <div className="flex flex-col items-center" style={{ gap: "20px", padding: "24px 0" }}>
          {["Facebook", "YouTube", "Instagram"].map(name => (
            <a key={name} href="#" aria-label={name}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ width: "29px", height: "29px", border: "1px solid rgba(253,245,242,0.6)", borderRadius: "4px", color: "#fdf5f2" }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                {name === "Facebook" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                {name === "YouTube" && <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />}
                {name === "Instagram" && <><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></>}
              </svg>
            </a>
          ))}
        </div>
        <div style={{ width: "1px", height: "155px", backgroundColor: "rgba(253,245,242,0.5)" }} />
      </div>

      {/* Content — flex, responsive padding */}
      <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-12 lg:px-[235px] pb-12 sm:pb-16 lg:pb-20"
        style={{ minHeight: "clamp(460px, 70vh, 990px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: "2px", height: "1px", backgroundColor: "#bea055", marginBottom: "20px" }}
          transition={{ duration: 0.4 }}
        />
        <div style={{ width: "clamp(160px, 40vw, 700px)", height: "1px", backgroundColor: "#bea055", marginBottom: "20px" }} />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-commissioner)",
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#fdf5f2",
            marginBottom: "20px",
            maxWidth: "700px",
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-commissioner)",
            fontSize: "clamp(15px, 2vw, 20px)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(253,245,242,0.75)",
            maxWidth: "600px",
          }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
