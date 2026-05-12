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
      <div className="px-4 sm:px-8 lg:px-[235px]">

        {/* 3 city cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-0 lg:flex lg:justify-between justify-items-center sm:justify-items-start">
          {cities.map((city, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
              style={{ maxWidth: "100%" }}
            >
              {/* Gold icon box */}
              <div className="flex items-center justify-center shrink-0"
                style={{ width: "80px", height: "80px", backgroundColor: "#bea055", borderRadius: "15px", marginBottom: "20px" }}>
                {city.icon}
              </div>

              {/* City name */}
              <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(24px,2.5vw,30px)", fontWeight: 700, lineHeight: 1.3, color: "#1c1d1e", marginBottom: "8px" }}>
                {city.name}
              </h2>

              {/* Gold divider */}
              <div style={{ height: "1px", width: "100%", maxWidth: "250px", backgroundColor: "#bea055", marginBottom: "20px" }} />

              {/* Photo */}
              <div className="relative overflow-hidden w-full" style={{ maxWidth: "250px", aspectRatio: "3/2", borderRadius: "15px", marginBottom: "20px" }}>
                <Image src={city.image} alt={city.name} fill className="object-cover" />
              </div>

              {/* Body text */}
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", fontWeight: 400, lineHeight: 1.65, color: "#000000", marginBottom: "24px", maxWidth: "280px" }}>
                {city.text}
              </p>

              {/* Button */}
              <Link href={city.href} className="inline-flex items-center gap-2 self-start"
                style={{ height: "46px", backgroundColor: "#bea055", borderRadius: "50px", paddingLeft: "24px", paddingRight: "18px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}>
                Čítať viac
                <svg width="28" height="8" viewBox="0 0 28 8" fill="none"><path d="M0 4h24M20 1l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
