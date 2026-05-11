"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Status = "pending" | "show" | "exit" | "done";

export function PageLoader() {
  // "pending" = dark screen while we check sessionStorage (prevents flash)
  // "show"    = full animated loader (first visit)
  // "exit"    = fading out
  // "done"    = unmounted
  const [status, setStatus] = useState<Status>("pending");

  useEffect(() => {
    const seen = sessionStorage.getItem("mt_loader_seen");

    if (seen) {
      // Already seen — remove dark cover immediately
      setStatus("done");
      return;
    }

    // First visit — show full loader
    sessionStorage.setItem("mt_loader_seen", "1");
    setStatus("show");

    const toExit   = setTimeout(() => setStatus("exit"), 2800);
    const toDone   = setTimeout(() => setStatus("done"), 3600);
    return () => { clearTimeout(toExit); clearTimeout(toDone); };
  }, []);

  if (status === "done") return null;

  // Dark cover before useEffect fires — prevents site flash
  if (status === "pending") {
    return <div style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "#1c1d1e" }} />;
  }

  return (
    <AnimatePresence>
      {status === "show" || status === "exit" ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: status === "exit" ? 0 : 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
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
            pointerEvents: status === "exit" ? "none" : "auto",
          }}
        >
          {/* Logo — enters first, big 3D flip */}
          <motion.div
            initial={{ opacity: 0, rotateY: 90, scale: 0.85 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: "700px", filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.6))" }}
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

          {/* MARANA THA — starts after logo is mostly visible (delay 1.1s) */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {"MARANA THA".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
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
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar — starts after text begins */}
          <div style={{ width: "160px", height: "1px", backgroundColor: "rgba(190,160,85,0.2)", borderRadius: "1px", overflow: "hidden" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, delay: 1.6, ease: "easeInOut" }}
              style={{ height: "100%", backgroundColor: "#bea055", borderRadius: "1px" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
