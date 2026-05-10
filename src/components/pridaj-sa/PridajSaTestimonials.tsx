"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote: "Keď som prvýkrát prišiel na večer chvál, ani som netušil, že sa tu stanem súčasťou rodiny. Ľudia ma prijali takého, aký som bol.",
    name: "Martin K.",
    role: "Člen spoločenstva 3 roky",
    photo: "/images/o-nas-testimonial-person.jpg",
  },
  {
    quote: "Hľadala som miesto kde môžem rásť vo viere aj v živote. Marana Tha mi dala komunitu, priateľov a zmysel. Nikdy som nič také nezažila.",
    name: "Lucia M.",
    role: "Sympatizantka",
    photo: "/images/o-nas-testimonial-2.jpg",
  },
  {
    quote: "Prvý krok bol najťažší — ale len zdanlivo. Hneď pri vstupe som bol privítaný ako starý priateľ. Dnes tu slúžim v hudobnej službe.",
    name: "Peter S.",
    role: "Člen spoločenstva 5 rokov",
    photo: "/images/o-nas-testimonial-person.jpg",
  },
];

export function PridajSaTestimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  function goTo(idx: number) {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }
  function prev() { goTo((current - 1 + testimonials.length) % testimonials.length); }
  function next() { goTo((current + 1) % testimonials.length); }

  const t = testimonials[current];

  return (
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
          Čo hovoria ostatní
        </p>

        <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "56px 64px", position: "relative", overflow: "hidden", maxWidth: "860px" }}>
          {/* Big quote mark */}
          <div style={{ position: "absolute", top: "24px", left: "48px", fontFamily: "Georgia, serif", fontSize: "120px", color: "#e4d5b2", lineHeight: 1, userSelect: "none" }}>
            "
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{
                fontFamily: "var(--font-commissioner)",
                fontSize: "24px",
                fontWeight: 400,
                color: "#1c1d1e",
                lineHeight: "1.6",
                marginBottom: "40px",
                paddingTop: "32px",
                maxWidth: "640px",
              }}>
                {t.quote}
              </p>

              <div className="flex items-center gap-4">
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", backgroundColor: "#e6ded5", flexShrink: 0 }}>
                  <Image src={t.photo} alt={t.name} width={52} height={52} className="object-cover w-full h-full" />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>{t.name}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#977d3e" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-10">
            <button onClick={prev} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #bea055", background: "transparent", cursor: "pointer", color: "#bea055", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ‹
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "50px", background: i === current ? "#bea055" : "#e4d5b2", border: "none", cursor: "pointer", transition: "all 0.2s", padding: 0 }}
                />
              ))}
            </div>
            <button onClick={next} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #bea055", background: "transparent", cursor: "pointer", color: "#bea055", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
