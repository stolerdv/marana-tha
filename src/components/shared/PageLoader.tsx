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

    // Bar takes 2.4s → start exit at 2.6s so bar fully completes
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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#1c1d1e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {/* 3D logo with glow */}
          <motion.div
            initial={{ opacity: 0, rotateY: -80, scale: 0.75 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: "800px" }}
          >
            {/* Outer glow ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.35, 0.2], scale: [0.6, 1.15, 1.05] }}
              transition={{ duration: 1.4, delay: 0.8, times: [0, 0.6, 1] }}
              style={{
                position: "absolute",
                inset: "-24px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(190,160,85,0.25) 0%, transparent 70%)",
                filter: "blur(12px)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              animate={{ rotateY: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              style={{
                transformStyle: "preserve-3d",
                position: "relative",
                filter: "drop-shadow(0 0 24px rgba(190,160,85,0.4)) drop-shadow(0 8px 32px rgba(0,0,0,0.6))",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Marana Tha"
                width={170}
                height={106}
                priority
                style={{ width: "170px", height: "auto", filter: "brightness(0) invert(1)" }}
              />
            </motion.div>
          </motion.div>

          {/* "MARANA THA" letter by letter */}
          <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
            {"MARANA THA".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontFamily: "var(--font-commissioner)",
                  fontSize: char === " " ? "0px" : "20px",
                  fontWeight: 700,
                  letterSpacing: "10px",
                  color: "#bea055",
                  width: char === " " ? "16px" : "auto",
                  display: "inline-block",
                  textShadow: "0 0 20px rgba(190,160,85,0.5)",
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar — runs 2.4s, completes before exit at 2.6s */}
          <div style={{ width: "140px", height: "2px", backgroundColor: "rgba(190,160,85,0.2)", borderRadius: "2px", overflow: "hidden" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, delay: 0.4, ease: "easeInOut" }}
              style={{ height: "100%", backgroundColor: "#bea055", borderRadius: "2px", boxShadow: "0 0 8px rgba(190,160,85,0.6)" }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="loader-fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#1c1d1e",
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
}
