"use client";

import { motion } from "framer-motion";

interface Event {
  title: string;
  date: string;
  duration: string;
}

const events: Event[] = [
  {
    title: "Alfa kurz pre mladých",
    date: "20. február 2026 | 19:30",
    duration: "20. február – 24. apríl",
  },
  {
    title: "Celonočná adorácia",
    date: "20. marec 2026 | 22:00",
    duration: "20. Marec – 21. marec | 22:00 – 7:00",
  },
  {
    title: "Celonočná adorácia",
    date: "20. marec 2026 | 22:00",
    duration: "20. Marec – 21. marec | 22:00 – 7:00",
  },
];

export function AktualitySection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)]" style={{ zIndex: 5 }}>
      {/* Gradient bridge: dark → cream behind the floating VCH card */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "300px", background: "linear-gradient(to bottom, #12110f 0%, var(--color-cream) 100%)", zIndex: 0 }} />

      <div className="relative max-w-[1512px] mx-auto" style={{ paddingLeft: "235px", paddingRight: "235px", paddingTop: "290px", zIndex: 1 }}>

        {/* Watermark */}
        <div className="relative pt-0 pb-0">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap"
            style={{ fontSize: "100px", fontFamily: "var(--font-commissioner)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", letterSpacing: "-2px" }}>
            AKTUALITY
          </div>

          {/* Subtitle */}
          <div className="relative pt-8">
            <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, color: "var(--color-gold-dark)" }}>
              aktuality
            </span>
          </div>

          {/* Section heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: "var(--font-commissioner)", fontSize: "40px", fontWeight: 700, color: "var(--color-gold)", marginTop: "8px", marginBottom: "32px" }}
          >
            Nadchadzajúce udalosti
          </motion.h2>

          {/* Events list */}
          <div className="flex flex-col">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Top gold line */}
                <div style={{ height: "1px", backgroundColor: "var(--color-gold)", width: "100%" }} />

                {/* Event row */}
                <div className="flex items-start py-6">
                  {/* Left: title + date */}
                  <div className="flex-1">
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "40px", fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.2 }}>
                      {event.title}
                      <br />
                      {event.date}
                    </p>
                  </div>

                  {/* Right: TRVANIE + duration */}
                  <div style={{ width: "530px" }}>
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.4 }}>
                      Trvanie
                      <br />
                      {event.duration}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Bottom gold line after last event */}
            <div style={{ height: "1px", backgroundColor: "var(--color-gold)", width: "100%" }} />
          </div>

          {/* CTA button */}
          <div className="flex justify-center mt-10 mb-16">
            <a
              href="/udalosti"
              className="inline-flex items-center justify-center rounded-full px-10 py-3 transition-colors"
              style={{ backgroundColor: "var(--color-gold)", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "var(--color-cream-light)" }}
            >
              Zobraziť kalendár
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
