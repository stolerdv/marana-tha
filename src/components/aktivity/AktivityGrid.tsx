"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Figma frame 12 @(18229,263). Same card structure as /sluzby (282×555 white r=15).
// Activities in 2 rows of 3, gap between rows=144px, gap between cols≈98px.
// After cards: full-width photo banner (1549×488) at y=2525 from frame top.
// Card internal layout identical to SluzbyGrid.

const activities = [
  {
    slug: "vecer-chval",
    titleShort: "Večer\nchvál",
    description: "Pravidelné stretnutia chvál a modlitieb pre celé spoločenstvo. Prežívaj živú prítomnosť Boha spolu s nami.",
    image: "/images/vecer-chval-hero.jpg",
    href: "/udalosti/vecer-chval",
  },
  {
    slug: "piatky-mladych",
    titleShort: "Piatky\npre mladých",
    description: "Piatkové stretnutia pre mládež — čas spoločenstva, chvál a rastu vo viere v bezpečnom prostredí.",
    image: "/images/sluzba-mladym.jpg",
    href: "/aktivity/piatky-mladych",
  },
  {
    slug: "adoracie",
    titleShort: "Celonočné\nadorácie",
    description: "Noc pred Bohom v tichu a adorácii. Osobitný čas modlitby a stretnutia s Ježišom.",
    image: "/images/sluzba-modlitby.jpg",
    href: "/aktivity/adoracie",
  },
  {
    slug: "modlitby-uzdravenie",
    titleShort: "Modlitby\nza uzdravenie",
    description: "Stretnutia zamerané na modlitbu za uzdravenie duše i tela. Prídi s dôverou, Boh ťa chce uzdraviť.",
    image: "/images/o-nas-1.jpg",
    href: "/aktivity/modlitby-uzdravenie",
  },
  {
    slug: "konferencia-zeny",
    titleShort: "ženská\nkonferencia",
    description: "Výročná konferencia pre ženy — čas formovania, sesterstva a sily v kresťanskej ženskosti.",
    image: "/images/sluzba-zenam.jpg",
    href: "/aktivity/konferencia-zeny",
  },
  {
    slug: "konferencia-muzi",
    titleShort: "mužská\nkonferencia",
    description: "Výročná konferencia pre mužov — rast v kresťanskom mužstve, vodcovstve a bratskej komunite.",
    image: "/images/sluzba-muzom.jpg",
    href: "/aktivity/konferencia-muzi",
  },
];

export function AktivityGrid() {
  return (
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px" }}>
      <div className="px-4 sm:px-8 lg:px-[235px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ paddingBottom: "80px" }}>
          {activities.map((activity, i) => (
            <motion.div
              key={activity.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="bg-white w-full lg:w-[282px]"
              style={{ borderRadius: "15px", overflow: "hidden", position: "relative", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
            >
              {/* Mobile layout */}
              <div className="lg:hidden flex flex-col">
                <div className="relative w-full overflow-hidden" style={{ height: "200px" }}>
                  <Image src={activity.image} alt={activity.titleShort.replace('\n', ' ')} fill className="object-cover" />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "22px", fontWeight: 700, color: "#1c1d1e", whiteSpace: "pre-line", marginBottom: "8px", lineHeight: 1.3 }}>{activity.titleShort}</h2>
                  <div style={{ height: "1px", backgroundColor: "#bea055", width: "100%", maxWidth: "180px", marginBottom: "10px" }} />
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", lineHeight: 1.6, color: "#000000", marginBottom: "16px" }}>{activity.description}</p>
                  <Link href={activity.href} className="inline-flex items-center gap-2"
                    style={{ height: "44px", backgroundColor: "#bea055", borderRadius: "50px", paddingLeft: "22px", paddingRight: "16px", fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#fdf5f2" }}>
                    Čítať viac
                    <svg width="28" height="8" viewBox="0 0 28 8" fill="none"><path d="M0 4h24M20 1l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </Link>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden lg:block" style={{ height: "555px", position: "relative" }}>
                <div style={{ padding: "0 33px" }}>
                  <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", whiteSpace: "pre-line", margin: "0" }}>{activity.titleShort}</h2>
                  <div style={{ height: "1px", backgroundColor: "#bea055", width: "218px", marginTop: "2px" }} />
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 500, lineHeight: "26.1px", color: "#000000", marginTop: "14px", maxHeight: "120px", overflow: "hidden" }}>{activity.description}</p>
                </div>
                <Link href={activity.href} className="inline-flex items-center gap-2"
                  style={{ position: "absolute", top: "282px", left: "33px", width: "186px", height: "50px", backgroundColor: "#bea055", borderRadius: "50px", paddingLeft: "27px", paddingRight: "20px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}>
                  Čítať viac
                  <svg width="36" height="10" viewBox="0 0 36 10" fill="none"><path d="M0 5h32M27 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </Link>
                <div className="absolute overflow-hidden" style={{ left: "29px", top: "351px", width: "224px", height: "204px" }}>
                  <Image src={activity.image} alt={activity.titleShort.replace('\n', ' ')} fill className="object-cover" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-width photo banner */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(200px,35vw,488px)" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/aktivity-hero.jpg')" }} />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}
