"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("mt_loader_seen");
    if (seen) return;
    sessionStorage.setItem("mt_loader_seen", "1");
    setVisible(true);

    const exit = setTimeout(() => setLeaving(true), 2600);
    const remove = setTimeout(() => setVisible(false), 3400);
    return () => { clearTimeout(exit); clearTimeout(remove); };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#1c1d1e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {/* Logo — 3D flip entrance */}
          <motion.div
            initial={{ opacity: 0, rotateY: 90, scale: 0.85 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              perspective: "700px",
              filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.5))",
            }}
          >
            <motion.div
              animate={{ rotateY: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/images/logo.png"
                alt="Marana Tha"
                width={220}
                height={136}
                priority
                style={{ width: "220px", height: "auto", filter: "brightness(0) invert(1)" }}
              />
            </motion.div>
          </motion.div>

          {/* MARANA THA — letter by letter */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {"MARANA THA".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontFamily: "var(--font-commissioner)",
                  fontSize: char === " " ? "0" : "28px",
                  fontWeight: 700,
                  letterSpacing: "12px",
                  color: "#bea055",
                  width: char === " " ? "20px" : "auto",
                  display: "inline-block",
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ width: "160px", height: "1px", backgroundColor: "rgba(190,160,85,0.25)", borderRadius: "1px", overflow: "hidden" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, delay: 0.4, ease: "easeInOut" }}
              style={{ height: "100%", backgroundColor: "#bea055", borderRadius: "1px" }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="loader-out"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "#1c1d1e", pointerEvents: "none" }}
        />
      )}
    </AnimatePresence>
  );
}
