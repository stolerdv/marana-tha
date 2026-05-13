"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CityBadge } from "@/components/shared/CityBadge";

interface AktualityEvent {
  id: string;
  title: string;
  slug: string;
  startDate: Date;
  location: string | null;
}

interface Props {
  events?: AktualityEvent[];
}

const ease = [0.22, 1, 0.36, 1] as const;

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
}
function formatTime(d: Date) {
  return new Date(d).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
}

export function AktualitySection({ events = [] }: Props) {
  return (
    <section className="relative bg-[var(--color-cream)]" style={{ zIndex: 5 }}>
      {/* Gradient bridge: dark → cream behind the floating VCH card */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "300px", background: "linear-gradient(to bottom, #12110f 0%, var(--color-cream) 100%)", zIndex: 0 }} />

      <div className="relative max-w-[1512px] mx-auto px-4 sm:px-8 lg:px-[235px]" style={{ paddingTop: "330px", zIndex: 1 }}>

        {/* Watermark — desktop only */}
        <div className="hidden lg:block absolute pointer-events-none select-none" style={{ top: "300px", left: "50%", transform: "translateX(-50%)", fontSize: "100px", fontFamily: "var(--font-commissioner)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", letterSpacing: "-2px", whiteSpace: "nowrap" }}>
          AKTUALITY
        </div>

        {/* Heading */}
        <div className="relative mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            style={{ fontFamily: "var(--font-commissioner)", fontSize: "40px", fontWeight: 700, color: "var(--color-gold)" }}
          >
            Nadchádzajúce udalosti
          </motion.h2>
        </div>

        {/* Events list */}
        <div className="flex flex-col">
          {events.length === 0 ? (
            <div style={{ height: "1px", backgroundColor: "var(--color-gold)", marginBottom: "32px" }} />
          ) : null}

          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              <div style={{ height: "1px", backgroundColor: "var(--color-gold)", width: "100%" }} />
              <Link href={`/udalosti/${event.slug}`} className="flex flex-col sm:flex-row sm:items-start py-6 group hover:bg-[var(--color-gold)]/5 transition-colors -mx-4 px-4 rounded-[8px]">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {event.location && <CityBadge city={event.location} size="sm" />}
                  </div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.2 }}>
                    {event.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(15px, 2.5vw, 20px)", color: "rgba(28,29,30,0.5)", marginTop: "6px" }}>
                    {formatDate(event.startDate)}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0" style={{ width: "auto", minWidth: "120px", paddingTop: "8px" }}>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "8px", opacity: 0.6 }}>
                    Čas
                  </p>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.3 }}>
                    {formatTime(event.startDate)}
                  </p>
                </div>
                <div className="hidden sm:flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--color-gold)", paddingLeft: "16px" }}>
                  <svg width="24" height="10" viewBox="0 0 24 10" fill="none"><path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
              </Link>
            </motion.div>
          ))}

          <div style={{ height: "1px", backgroundColor: "var(--color-gold)", width: "100%" }} />
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10 mb-16">
          <motion.a
            href="/udalosti?view=calendar"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="inline-flex items-center justify-center rounded-full px-10 py-3 transition-colors hover:bg-[var(--color-gold-dark)]"
            style={{ backgroundColor: "var(--color-gold)", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "var(--color-cream-light)" }}
          >
            Zobraziť kalendár
          </motion.a>
        </div>
      </div>
    </section>
  );
}
