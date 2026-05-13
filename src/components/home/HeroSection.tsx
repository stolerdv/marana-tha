"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative" style={{ minHeight: "100vh", backgroundColor: "#1c1d1e", zIndex: 10 }}>
      {/* Clipping wrapper for bg layers only */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundPosition: "72% 20%" }} />
        <div className="absolute inset-0"
          style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #1c1d1e 12%, transparent 60%, rgba(28,29,30,0.7) 85%, rgba(28,29,30,0.97) 100%)", mixBlendMode: "multiply" }} />
      </div>

      {/* Social icons — right edge (hidden on mobile/tablet) */}
      <div className="hidden lg:flex absolute flex-col items-center z-20" style={{ right: "56px", top: "50%", transform: "translateY(-50%)" }}>
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

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-12 lg:px-[235px]"
        style={{ paddingTop: "28vh", paddingBottom: "60px" }}>

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

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "60px", height: "2px", backgroundColor: "#bea055", marginBottom: "28px", transformOrigin: "center" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-commissioner)",
            fontSize: "clamp(15px, 2.5vw, 19px)",
            fontWeight: 400,
            color: "rgba(253,245,242,0.75)",
            lineHeight: "1.6",
            maxWidth: "520px",
            marginBottom: "36px",
          }}
        >
          Katolícke spoločenstvo v Prešove, Bardejove a Košiciach. Príď, spoznaj nás a prežívaj živú vieru spoločne s nami.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/pridaj-sa"
            className="justify-center"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "#bea055", color: "#1c1d1e",
              borderRadius: "50px", padding: "16px 36px",
              fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700,
            }}>
            Pridaj sa k nám
          </Link>
          <Link href="/udalosti"
            className="justify-center"
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
    </section>
  );
}
