"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const svedectva = [
  {
    name: "Meno Priezvisko",
    role: "Člen spoločenstva",
    text: "Spoločenstvo Marana Tha mi zmenilo život. Tu som našiel skutočných priateľov a miesto, kde môžem rásť vo viere. Každé stretnutie je pre mňa požehnaním a inšpiráciou do každodenného života.",
  },
  {
    name: "Meno Priezvisko",
    role: "Sympatizant",
    text: "Keď som prvýkrát prišiel na stretnutie, mal som obavy. Ale tu ma prijali takého, aký som. Dnes som súčasťou malej skupinky a cítim, že konečne patrim niekam.",
  },
  {
    name: "Meno Priezvisko",
    role: "Vedúca hudobnej služby",
    text: "V Marana Tha som objavila svoje dary. Hudba vždy bola mojou vášňou, ale tu som pochopila, že slúžiť cez chválu je niečo úplne iné — je to modlitba, nie len vystúpenie.",
  },
  {
    name: "Meno Priezvisko",
    role: "Manželia v spoločenstve",
    text: "Naše manželstvo sa zmenilo, keď sme vstúpili do malej skupinky pre páry. Učíme sa spolu, modlíme sa spolu a nachádzame podporu, ktorú sme predtým nevedeli ani hľadať.",
  },
  {
    name: "Meno Priezvisko",
    role: "Mladý člen",
    text: "Myslel som si, že viera je pre starých ľudí. Piatky pre mladých mi ukázali, že Boh hovorí aj dnešným jazykom. Tu som stretol rovesníkov, s ktorými môžem byť autentický.",
  },
];

const INTERVAL = 7000;

export function ONasSvedectva() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((idx: number, dir = 1) => {
    setDirection(dir);
    setCurrent(idx);
    setProgress(0);
  }, []);

  function prev() { goTo((current - 1 + svedectva.length) % svedectva.length, -1); }
  function next() { goTo((current + 1) % svedectva.length, 1); }

  // Auto-advance
  useEffect(() => {
    const tick = 50;
    const step = (tick / INTERVAL) * 100;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          goTo((current + 1) % svedectva.length, 1);
          return 0;
        }
        return p + step;
      });
    }, tick);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const t = svedectva[current];

  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "60px" }}>

      {/* Watermark */}
      <div className="absolute pointer-events-none select-none" style={{ top: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-commissioner)", fontSize: "100px", fontWeight: 700, letterSpacing: "10px", color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", whiteSpace: "nowrap" }}>
        svedectvá
      </div>

      {/* Subtitle */}
      <div className="relative px-4 sm:px-8 lg:px-[235px] mb-6">
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(32px,4vw,50px)", fontWeight: 400, color: "#977d3e" }}>
          svedectvá
        </p>
      </div>

      {/* Full-width photo container */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(320px,50vw,580px)" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/o-nas-svedectva.jpg')" }} />
        <div className="absolute inset-0 bg-black/35" />

        {/* Card */}
        <div style={{ position: "absolute", top: "clamp(16px,4vw,80px)", left: "16px", right: "16px" }}>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white"
              style={{ borderRadius: "17px", padding: "clamp(20px,4vw,40px) clamp(16px,4vw,48px)" }}
            >
              {/* Person */}
              <div className="flex items-center gap-4 mb-4">
                <div style={{ width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#e6ded5", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(15px,2vw,18px)", fontWeight: 700, color: "#000", margin: 0 }}>{t.name}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#977d3e", margin: 0 }}>{t.role}</p>
                </div>
              </div>

              {/* Quote */}
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(14px,1.8vw,17px)", fontWeight: 500, lineHeight: 1.7, color: "#1c1d1e", marginBottom: "20px" }}>
                {t.text}
              </p>

              {/* Progress bar + nav */}
              <div className="flex items-center gap-4">
                {/* Progress bar */}
                <div style={{ flex: 1, height: "3px", backgroundColor: "#e4d5b2", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#bea055", borderRadius: "2px", transition: "width 50ms linear" }} />
                </div>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {svedectva.map((_, i) => (
                    <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)}
                      style={{ width: i === current ? "16px" : "6px", height: "6px", borderRadius: "3px", backgroundColor: i === current ? "#977d3e" : "#d4c4a8", transition: "all 0.3s", border: "none", padding: 0, cursor: "pointer" }} />
                  ))}
                </div>

                {/* Prev/Next */}
                <div className="flex gap-2">
                  <button onClick={prev} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid rgba(151,125,62,0.4)", background: "transparent", cursor: "pointer", color: "#977d3e", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M7 1L1 6l6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button onClick={next} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid rgba(151,125,62,0.4)", background: "transparent", cursor: "pointer", color: "#977d3e", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div style={{ height: "60px" }} />
    </section>
  );
}
