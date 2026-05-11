"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function NewsletterSection() {
  const [form, setForm] = useState({ meno: "", priezvisko: "", email: "", gdpr: false });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#12110f" }}>
      {/* Subtle grain texture via radial gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(190,160,85,0.07) 0%, transparent 70%)" }} />

      <div style={{ paddingLeft: "235px", paddingRight: "235px", paddingTop: "96px", paddingBottom: "96px" }}>
        <div className="flex gap-20 items-center">

          {/* LEFT — pitch */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="shrink-0"
            style={{ width: "420px" }}
          >
            <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "11px", fontWeight: 700, letterSpacing: "5px", textTransform: "uppercase", color: "#bea055", display: "block", marginBottom: "20px" }}>
              Newsletter
            </span>
            <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "52px", fontWeight: 700, color: "#fdf5f2", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: "24px" }}>
              Ostán<br />
              <span style={{ color: "#bea055" }}>v obraze.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 400, color: "rgba(253,245,242,0.55)", lineHeight: 1.65 }}>
              Dostávaj správy o stretnutiach, akciách a dianí v spoločenstve Marana Tha priamo do e-mailu.
            </p>

            {/* Decorative gold line */}
            <div style={{ width: "48px", height: "2px", backgroundColor: "#bea055", marginTop: "36px", opacity: 0.4 }} />
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
            className="flex-1"
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>✓</div>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#bea055" }}>
                  Ďakujeme za prihlásenie!
                </p>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "rgba(253,245,242,0.4)", marginTop: "8px" }}>
                  Budeme ťa informovať o všetkom dôležitom.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                {/* Name row */}
                <div className="flex gap-6">
                  {(["meno", "priezvisko"] as const).map((field, i) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease }}
                      className="flex-1 relative"
                      style={{ borderBottom: "1px solid rgba(253,245,242,0.15)", paddingBottom: "12px", marginBottom: "28px" }}
                    >
                      <input
                        type="text"
                        placeholder={field === "meno" ? "Meno" : "Priezvisko"}
                        value={form[field]}
                        onChange={e => setForm({ ...form, [field]: e.target.value })}
                        style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 400, color: "#fdf5f2", paddingTop: "4px" }}
                        className="placeholder:text-[rgba(253,245,242,0.25)] focus:placeholder:text-[rgba(253,245,242,0.1)] transition-colors"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.36, ease }}
                  style={{ borderBottom: "1px solid rgba(253,245,242,0.15)", paddingBottom: "12px", marginBottom: "32px" }}
                >
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 400, color: "#fdf5f2", paddingTop: "4px" }}
                    className="placeholder:text-[rgba(253,245,242,0.25)]"
                  />
                </motion.div>

                {/* GDPR */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.44, ease }}
                  className="flex items-center gap-3 mb-10 cursor-pointer"
                  onClick={() => setForm({ ...form, gdpr: !form.gdpr })}
                >
                  <div style={{
                    width: "20px", height: "20px", flexShrink: 0,
                    border: `1.5px solid ${form.gdpr ? "#bea055" : "rgba(253,245,242,0.25)"}`,
                    borderRadius: "4px",
                    backgroundColor: form.gdpr ? "#bea055" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}>
                    {form.gdpr && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4l3 3 6-6" stroke="#12110f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "rgba(253,245,242,0.45)", lineHeight: 1.4, userSelect: "none" }}>
                    Súhlasím so spracovaním osobných údajov
                  </span>
                </motion.div>

                {/* Submit */}
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.52, ease }}
                  type="submit"
                  className="self-start"
                  style={{
                    backgroundColor: "#bea055", color: "#12110f",
                    border: "none", borderRadius: "50px",
                    padding: "16px 40px",
                    fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700,
                    cursor: "pointer", transition: "background 0.2s",
                  }}
                  whileHover={{ backgroundColor: "#d4b46a" }}
                >
                  Prihlásiť sa na odber
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
