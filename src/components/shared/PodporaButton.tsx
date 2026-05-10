"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function PodporaButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.4 }}
      style={{ position: "fixed", right: "32px", bottom: "32px", zIndex: 100 }}
    >
      <Link
        href="/podpora"
        className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow hover:opacity-90"
        style={{
          backgroundColor: "#977d3e",
          borderRadius: "50px",
          height: "52px",
          paddingLeft: "24px",
          paddingRight: "24px",
          fontFamily: "var(--font-commissioner)",
          fontSize: "14px",
          fontWeight: 700,
          color: "#fdf5f2",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Podpora
      </Link>
    </motion.div>
  );
}
