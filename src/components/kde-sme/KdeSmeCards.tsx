"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Figma: 3 city cards, each 252×689px, starting at y=1072 from frame top (frame=263)
// Cards section top padding: 1072-990=82px after hero
// Layout: 3 cards with gap 145px (justify-between also works: (1042-3*252)/2=143≈145)
// Each card internal layout (offsets from card top y=1335):
//   Gold box (108×108 r=15): top=0
//   City name (Commissioner 700 30px lh=55): top=150px
//   Gold divider (250×1 #bea055): top=205px
//   Photo (250×167 r=15): top=247px (42px below divider)
//   Body text (Inter 500 18px, 225px wide): top=458px
//   Button (186×50 #bea055 r=50): top=639px

const cities = [
  {
    name: "Prešov",
    href: "/spolocenstvo/presov",
    image: "/images/presov.jpg",
    text: "Spoločenstvo Marana Tha v Prešove — miesto stretnutí, modlitieb, chvál a formácie pre ľudí všetkých vekových skupín.",
    icon: (
      <svg width="49" height="38" viewBox="0 0 49 38" fill="none">
        <path d="M24.5 4C16.768 4 10.5 10.268 10.5 18C10.5 28 24.5 38 24.5 38C24.5 38 38.5 28 38.5 18C38.5 10.268 32.232 4 24.5 4Z" fill="#fdf5f2" />
        <circle cx="24.5" cy="18" r="5" fill="#bea055" />
      </svg>
    ),
  },
  {
    name: "Košice",
    href: "/spolocenstvo/kosice",
    image: "/images/kosice.jpg",
    text: "Spoločenstvo Marana Tha v Košiciach — živé kresťanské spoločenstvo, kde každý nájde miesto prijatia a rast vo viere.",
    icon: (
      <svg width="49" height="38" viewBox="0 0 49 38" fill="none">
        <path d="M24.5 4C16.768 4 10.5 10.268 10.5 18C10.5 28 24.5 38 24.5 38C24.5 38 38.5 28 38.5 18C38.5 10.268 32.232 4 24.5 4Z" fill="#fdf5f2" />
        <circle cx="24.5" cy="18" r="5" fill="#bea055" />
      </svg>
    ),
  },
  {
    name: "Bardejov",
    href: "/spolocenstvo/bardejov",
    image: "/images/bardejov.jpg",
    text: "Spoločenstvo Marana Tha v Bardejove — miesto stretnutí a spoločenstva pre tých, ktorí hľadajú živý vzťah s Bohom.",
    icon: (
      <svg width="49" height="38" viewBox="0 0 49 38" fill="none">
        <path d="M24.5 4C16.768 4 10.5 10.268 10.5 18C10.5 28 24.5 38 24.5 38C24.5 38 38.5 28 38.5 18C38.5 10.268 32.232 4 24.5 4Z" fill="#fdf5f2" />
        <circle cx="24.5" cy="18" r="5" fill="#bea055" />
      </svg>
    ),
  },
];

export function KdeSmeCards() {
  return (
    // pt=82px: city cards start 82px below hero (y=1072 - y=990 = 82px)
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "82px", paddingBottom: "80px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* 3 city cards row — Figma: justify-between, each 252px wide, gap ~145px */}
        <div className="flex justify-between">
          {cities.map((city, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ width: "252px" }}
            >
              {/* Gold box (108×108 r=15) with icon */}
              <div
                className="flex items-center justify-center"
                style={{ width: "108px", height: "108px", backgroundColor: "#bea055", borderRadius: "15px" }}
              >
                {city.icon}
              </div>

              {/* City name — Figma: Commissioner 700 30px lh=55px, top=150px from card top */}
              <h2
                style={{
                  marginTop: `${150 - 108}px`,   // 42px from box bottom
                  fontFamily: "var(--font-commissioner)",
                  fontSize: "30px",
                  fontWeight: 700,
                  lineHeight: "55px",
                  color: "#1c1d1e",
                  marginBottom: "0px",
                }}
              >
                {city.name}
              </h2>

              {/* Gold divider — Figma: 250×1 #bea055, immediately after name (top=205px) */}
              <div style={{ height: "1px", width: "250px", backgroundColor: "#bea055" }} />

              {/* Photo — Figma: 250×167 r=15, 42px below divider */}
              <div
                className="relative overflow-hidden"
                style={{ width: "250px", height: "167px", borderRadius: "15px", marginTop: "42px" }}
              >
                <Image src={city.image} alt={city.name} fill className="object-cover" />
              </div>

              {/* Body text — Figma: Inter 500 18px lh=26.1px ls=-0.09 #000000, 225px wide, top=458px → 44px below photo bottom */}
              <p
                style={{
                  marginTop: "44px",
                  width: "225px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "26.1px",
                  letterSpacing: "-0.09px",
                  color: "#000000",
                  marginBottom: "0px",
                }}
              >
                {city.text}
              </p>

              {/* Button — Figma: Group 42/49, 186×50 #bea055 r=50, Commissioner 700 15px #fdf5f2 */}
              {/* top=639px from card top → gap from text bottom ≈ 639-(458+130)=51px */}
              <Link
                href={city.href}
                className="inline-flex items-center gap-2"
                style={{
                  marginTop: "51px",
                  width: "186px",
                  height: "50px",
                  backgroundColor: "#bea055",
                  borderRadius: "50px",
                  paddingLeft: "27px",
                  paddingRight: "20px",
                  fontFamily: "var(--font-commissioner)",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#fdf5f2",
                  display: "inline-flex",
                }}
              >
                Čítať viac
                <svg width="36" height="10" viewBox="0 0 36 10" fill="none">
                  <path d="M0 5h32M27 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
