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
  const rows = [activities.slice(0, 3), activities.slice(3, 6)];

  return (
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "137px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
        <div className="flex flex-col" style={{ gap: "144px", paddingBottom: "144px" }}>
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-between">
              {row.map((activity, i) => (
                <motion.div
                  key={activity.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white"
                  style={{ width: "282px", height: "555px", borderRadius: "15px", overflow: "hidden", flexShrink: 0, position: "relative" }}
                >
                  {/* Title — Commissioner 700 30px lh=55px 2 lines, y≈0 */}
                  <div style={{ padding: "0 33px" }}>
                    <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", whiteSpace: "pre-line", margin: "0" }}>
                      {activity.titleShort}
                    </h2>
                    {/* Gold divider — Figma: 218×1 #bea055, y=112 from card top */}
                    <div style={{ height: "1px", backgroundColor: "#bea055", width: "218px", marginTop: "2px" }} />
                    {/* Body text */}
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 500, lineHeight: "26.1px", letterSpacing: "-0.09px", color: "#000000", marginTop: "14px", marginBottom: "0", maxHeight: "120px", overflow: "hidden" }}>
                      {activity.description}
                    </p>
                  </div>

                  {/* Button at absolute y=282 */}
                  <Link
                    href={activity.href}
                    className="inline-flex items-center gap-2"
                    style={{ position: "absolute", top: "282px", left: "33px", width: "186px", height: "50px", backgroundColor: "#bea055", borderRadius: "50px", paddingLeft: "27px", paddingRight: "20px", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}
                  >
                    Čítať viac
                    <svg width="36" height="10" viewBox="0 0 36 10" fill="none">
                      <path d="M0 5h32M27 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </Link>

                  {/* Photo at absolute y=351 — fills card bottom (351+204=555=card height) */}
                  <div className="absolute overflow-hidden" style={{ left: "29px", top: "351px", width: "224px", height: "204px" }}>
                    <Image src={activity.image} alt={activity.titleShort.replace('\n', ' ')} fill className="object-cover" />
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Full-width photo banner — Figma: Oheň_Sobota 1549×488, y=2525 from frame top, 144px after cards end */}
      <div className="relative w-full overflow-hidden" style={{ height: "488px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/aktivity-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}
