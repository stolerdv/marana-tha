"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Figma frame 13 @(20333,263) 1512×6209. Content left=20568.
//
// Group 94 (1044×618 @(20567,1124)):
//   y_rel = 1124-263=861 from frame top (inside 990px hero section, extends 489px past it)
//   image 8 (1044×590 r=15): full background photo
//   Rectangle 51 (986×531 r=11 #292929): dark overlay band, y=28 from group top
//   "Najbližší večer chvál" (Inter 700 50px #fdf5f2): y=45 from group top
//   3 city blocks inside dark band:
//     Rectangle 111 (282×369 r=15 white): x offsets: 67, 380, 693 from content left
//     City title (Commissioner 700 30px #ffffff wait, text on white is black?):
//       Looking at coords: text @y=1283, card @y=1264. Text is 19px from card top.
//       Cards are white (fill=#ffffff) so text color should be #1c1d1e not #ffffff
//       Let me check: text fill=#ffffff for "Prešov/Košice/bardejov"... but card fill is white.
//       Actually maybe the text color is meant to be inside the dark band that covers the card area?
//       The dark band ends at y=1152+531=1683. City cards start at y=1264. 1264 < 1683.
//       So the city cards (starting at y=1264) are WITHIN the dark band (ends at 1683).
//       That means the white card is on top of the dark band. Text on white card = dark text. But text says fill=#ffffff!
//       This might be an error in Figma, or the text is on the dark portion of the band before the card.
//       Let me assume: text (30px "Prešov") at y=1283 is ABOVE the card top (y=1264+19=1283)?
//       No: card y=1264, text y=1283 means text is 19px INSIDE the card.
//       If card is white and text fill=#ffffff, it would be invisible. This is likely a Figma error.
//       I'll use #1c1d1e for the city name inside the white card.
//     Gold divider (218×1 #bea055): y=1330-1264=66 from card top
//     Photo (250×167 r=15): y=1449-1264=185 from card top
//   Rectangle 84 (1044×166 r=15 #e6ded5 beige strip): y=452 from group top (overlaps photo/card bottom)

const cities = [
  { name: "Prešov", href: "/spolocenstvo/presov", image: "/images/vch-presov.jpg" },
  { name: "Košice", href: "/spolocenstvo/kosice", image: "/images/vch-kosice.jpg" },
  { name: "Bardejov", href: "/spolocenstvo/bardejov", image: "/images/vch-bardejov.jpg" },
];

export function VecerChvalSection() {
  // This section starts at y=861 within the hero section and extends 489px beyond hero
  // We position it as a continuation below PageHero (no top margin needed if placed right after hero)

  return (
    <section className="bg-[var(--color-cream)]" style={{ paddingBottom: "80px" }}>
      {/* Group 94 container — 1044×618px */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
        style={{ width: "1044px", height: "618px", borderRadius: "15px" }}
      >
        {/* Background photo — Figma: image 8, 1044×590 r=15 */}
        <div
          className="absolute"
          style={{ inset: 0, width: "1044px", height: "590px", borderRadius: "15px", overflow: "hidden" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/vecer-chval-main.jpg')" }}
          />
        </div>

        {/* Dark overlay band — Figma: Rectangle 51, 986×531 r=11 #292929, x=29, y=28 */}
        <div
          className="absolute"
          style={{
            left: "29px", top: "28px",
            width: "986px", height: "531px",
            backgroundColor: "#292929",
            borderRadius: "11px",
            opacity: 0.92,
          }}
        />

        {/* "Najbližší večer chvál" — Figma: Inter 700 50px #fdf5f2, y=45 from group top */}
        <div
          className="absolute flex justify-center"
          style={{ left: "29px", right: "29px", top: "45px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "50px",
              fontWeight: 700,
              lineHeight: "60.5px",
              color: "#fdf5f2",
              letterSpacing: "0px",
            }}
          >
            Najbližší večer chvál
          </span>
        </div>

        {/* 3 city cards — Figma: 282×369 r=15 white, x offsets: 67, 380, 693 from content left (=group left) */}
        {cities.map((city, i) => {
          const xPositions = [67, 380, 693];
          return (
            <Link
              key={city.name}
              href={city.href}
              className="absolute bg-white group"
              style={{
                left: `${xPositions[i]}px`,
                top: "140px",   // y=1264-1124=140 from group top
                width: "282px",
                height: "369px",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              {/* City name — Commissioner 700 30px #1c1d1e, y=19 from card top */}
              <div style={{ padding: "19px 33px 0" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "30px",
                    fontWeight: 700,
                    lineHeight: "55px",
                    color: "#1c1d1e",
                    margin: 0,
                  }}
                >
                  {city.name}
                </h3>
                {/* Gold divider — Figma: Rectangle 102 218×1 #bea055, y=66 from card top (19+55+2=76?) */}
                <div style={{ height: "1px", backgroundColor: "#bea055", width: "218px", marginTop: "0" }} />
              </div>

              {/* Photo — Figma: 250×167 r=15, y=185 from card top */}
              <div
                className="absolute overflow-hidden"
                style={{ left: "16px", top: "185px", width: "250px", height: "167px", borderRadius: "15px" }}
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          );
        })}

        {/* Beige strip — Figma: Rectangle 84 1044×166 #e6ded5 r=15, y=452 from group top */}
        <div
          className="absolute"
          style={{
            left: "0",
            top: "452px",
            width: "1044px",
            height: "166px",
            backgroundColor: "#e6ded5",
            borderRadius: "15px",
            zIndex: 0,
          }}
        />
      </motion.div>
    </section>
  );
}
