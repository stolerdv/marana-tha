"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [form, setForm] = useState({ meno: "", priezvisko: "", email: "", gdpr: false });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to API route
    setSent(true);
  };

  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-[family-name:var(--font-commissioner)] font-bold text-black/[0.04] whitespace-nowrap leading-none"
          style={{ fontSize: "100px" }}
        >
          newsletter
        </span>
      </div>

      {/* Gold divider */}
      <div style={{ height: "1px", backgroundColor: "var(--color-gold)", width: "700px", marginLeft: "813px" }} />

      <div className="relative pt-20 pb-16" style={{ paddingLeft: "235px", paddingRight: "235px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-inter)] text-[1.625rem] font-medium text-[var(--color-ink)] mb-8">
            Chcem dostávať novinky o spoločenstve MaranaTha
          </h2>

          {sent ? (
            <p className="font-[family-name:var(--font-commissioner)] text-[1.625rem] text-[var(--color-gold)]">
              Ďakujeme za prihlásenie!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-0">
              {/* Fields */}
              {(["meno", "priezvisko", "email"] as const).map((field) => (
                <div key={field} className="relative mb-0">
                  <input
                    type={field === "email" ? "email" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field] as string}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-[613px] bg-transparent border-b border-[var(--color-ink)]/40 py-3 font-[family-name:var(--font-inter)] text-[1.625rem] font-normal text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  />
                </div>
              ))}

              {/* GDPR */}
              <div className="flex items-start gap-3 mt-6">
                <div
                  className="w-[30px] h-[30px] border border-[var(--color-ink)] flex items-center justify-center cursor-pointer shrink-0 mt-1"
                  style={{ backgroundColor: form.gdpr ? "var(--color-ink)" : "transparent" }}
                  onClick={() => setForm({ ...form, gdpr: !form.gdpr })}
                >
                  {form.gdpr && (
                    <div className="w-[14px] h-[14px] bg-[var(--color-nude)]" />
                  )}
                </div>
                <label className="font-[family-name:var(--font-inter)] text-[1.625rem] font-normal text-[var(--color-ink)] cursor-pointer leading-tight">
                  Súhlasím so spracovaním osobných údajov
                </label>
              </div>

              <div className="mt-8">
                <Button type="submit">Odoslať</Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
