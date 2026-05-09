"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma "zistiť viac..." section (y=5617 from frame top):
// Watermark "zistiť viac...": 100px Commissioner ls=10
// Subtitle "zistiť viac": Commissioner 400 50px #977d3e
// Rectangle 100: white card 1044×669 r=15 (contains 3 sub-cards + headings)
// Inside Rectangle 100:
//   Rectangle 103 (gold divider 250×1): x=179 from content (after card padding)
//   Rectangle 104 (gold divider 250×1): x=518 from content
//   "Naša služba": Commissioner 700 30px lh=55px, x=179 from content
//   "udalosti": Commissioner 700 30px lh=55px, x=518 from content
//   Sub-photos: Ohen_Sobota 250×167 r=15, P1079481 250×167 r=15 (2 photos shown)
//   Texts: Inter 500 18px lh=26.1px, max 225px wide
//   Buttons: 186×50 #bea055 r=50
//
// Sub-cards: Rectangle 106/107/108 each 292×597 r=15 (3 cards inside)
// Card positions from content (inside the 1044px white card):
//   Card 1: x=-181+217-235=-199+... let me use relative positions
//   Actually inside white card padding:
//   Card 1: x=17px from card left (card at x=-218, card content at about x=-181: offset=37px)
//   The 3 cards span from x≈17 to x≈17+3*292+2*gap

const cards = [
  {
    title: "KDE PÔSOBÍME?",
    href: "/kde-sme",
    image: "/images/support-1.jpg",
    text: "Pôsobíme v troch mestách na východnom Slovensku — Prešov, Bardejov a Košice.",
  },
  {
    title: "NAŠA SLUŽBA",
    href: "/sluzby",
    image: "/images/support-2.jpg",
    text: "Objav rozmanité služby a aktivity, ktoré ponúkame pre deti, mládež aj dospelých.",
  },
  {
    title: "UDALOSTI",
    href: "/udalosti",
    image: "/images/support-3.jpg",
    text: "Pozri si nadchádzajúce udalosti a pridaj sa k nám na naše pravidelné stretnutia.",
  },
];

export function ZistitViac() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden" style={{ paddingTop: "100px", paddingBottom: "80px" }}>

      {/* Watermark */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-commissioner)",
          fontSize: "100px",
          fontWeight: 700,
          letterSpacing: "10px",
          color: "transparent",
          WebkitTextStroke: "1px rgba(0,0,0,0.06)",
          whiteSpace: "nowrap",
        }}
      >
        zistiť viac...
      </div>

      <div className="relative" style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* Subtitle */}
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
          zistiť viac
        </p>

        {/* White container card — Figma: Rectangle 100 1044×669 r=15 white */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            width: "1044px",
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            padding: "36px 37px",
          }}
        >
          {/* 3 cards inside the white container */}
          <div className="flex gap-0" style={{ gap: "39px" }}>
            {cards.map((card, i) => (
              <motion.a
                key={i}
                href={card.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col"
                style={{
                  width: "292px",
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {/* Photo — Figma: 250×167 r=15 */}
                <div
                  className="relative overflow-hidden"
                  style={{ width: "250px", height: "167px", borderRadius: "15px", margin: "0 auto" }}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Gold divider — Figma: 250×1 #bea055 */}
                <div style={{ height: "1px", backgroundColor: "#bea055", width: "250px", margin: "16px auto 0" }} />

                {/* Title — Figma: Commissioner 700 30px lh=55px #1c1d1e */}
                <h3
                  style={{
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "30px",
                    fontWeight: 700,
                    lineHeight: "55px",
                    color: "#1c1d1e",
                    paddingLeft: "21px",
                    margin: "0px",
                  }}
                >
                  {card.title}
                </h3>

                {/* Text — Figma: Inter 500 18px lh=26.1px #000000, max 225px */}
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "18px",
                    fontWeight: 500,
                    lineHeight: "26.1px",
                    letterSpacing: "-0.09px",
                    color: "#000000",
                    paddingLeft: "21px",
                    paddingRight: "16px",
                    marginBottom: "24px",
                    flex: 1,
                  }}
                >
                  {card.text}
                </p>

                {/* Button — Figma: Group 43/44 186×50 #bea055 r=50 */}
                <div style={{ paddingLeft: "21px", paddingBottom: "24px" }}>
                  <span
                    className="inline-flex items-center gap-2"
                    style={{
                      width: "186px",
                      height: "50px",
                      backgroundColor: "#bea055",
                      borderRadius: "50px",
                      paddingLeft: "27px",
                      fontFamily: "var(--font-commissioner)",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#fdf5f2",
                    }}
                  >
                    Čítať viac
                    <svg width="36" height="10" viewBox="0 0 36 10" fill="none">
                      <path d="M0 5h32M27 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
