"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Show only once per session
    const seen = sessionStorage.getItem("mt_loader_seen");
    if (seen) return;
    sessionStorage.setItem("mt_loader_seen", "1");
    setVisible(true);

    // Start exit animation after 2.2s
    const exit = setTimeout(() => setLeaving(true), 2200);
    // Remove from DOM after exit animation
    const remove = setTimeout(() => setVisible(false), 3000);

    return () => { clearTimeout(exit); clearTimeout(remove); };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
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
          {/* 3D rotating logo */}
          <motion.div
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: "600px", perspectiveOrigin: "center" }}
          >
            <motion.div
              animate={{ rotateY: [0, 6, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/images/logo.png"
                alt="Marana Tha"
                width={160}
                height={100}
                priority
                style={{ width: "160px", height: "auto", filter: "brightness(0) invert(1)" }}
              />
            </motion.div>
          </motion.div>

          {/* "MARANA THA" — letter by letter */}
          <div style={{ display: "flex", gap: "6px" }}>
            {"MARANA THA".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontFamily: "var(--font-commissioner)",
                  fontSize: char === " " ? "0px" : "22px",
                  fontWeight: 700,
                  letterSpacing: "8px",
                  color: "#bea055",
                  width: char === " " ? "12px" : "auto",
                  display: "inline-block",
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          {/* Subtle gold line loader */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
            style={{
              width: "120px",
              height: "2px",
              backgroundColor: "#bea055",
              borderRadius: "2px",
              transformOrigin: "left",
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="loader-exit"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#1c1d1e",
          }}
        />
      )}
    </AnimatePresence>
  );
}
