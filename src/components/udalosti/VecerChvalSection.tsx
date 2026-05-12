"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const cities = [
  { name: "Prešov", href: "/spolocenstvo/presov", image: "/images/vch-presov.jpg" },
  { name: "Košice", href: "/spolocenstvo/kosice", image: "/images/vch-kosice.jpg" },
  { name: "Bardejov", href: "/spolocenstvo/bardejov", image: "/images/vch-bardejov.jpg" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function VecerChvalSection() {
  return (
    <section className="bg-[var(--color-cream)] px-4 sm:px-8 lg:px-[235px]" style={{ paddingBottom: "80px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="relative overflow-hidden w-full"
        style={{ borderRadius: "15px", backgroundColor: "#292929" }}
      >
        {/* Background photo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/vecer-chval-main.jpg')", opacity: 0.3 }} />
        </div>

        {/* Content */}
        <div className="relative" style={{ padding: "clamp(24px,4vw,40px)" }}>
          {/* Heading */}
          <h2 style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(22px,4vw,50px)", fontWeight: 700, color: "#fdf5f2", marginBottom: "clamp(20px,3vw,32px)", textAlign: "center" }}>
            Najbližší večer chvál
          </h2>

          {/* 3 city cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cities.map((city, i) => (
              <motion.div key={city.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, ease }}>
                <Link href={city.href} className="block bg-white group overflow-hidden" style={{ borderRadius: "15px" }}>
                  {/* City name */}
                  <div style={{ padding: "16px 24px 12px" }}>
                    <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#1c1d1e", margin: 0, lineHeight: 1.3 }}>{city.name}</h3>
                    <div style={{ height: "1px", backgroundColor: "#bea055", width: "100%", maxWidth: "180px", marginTop: "8px" }} />
                  </div>

                  {/* Photo */}
                  <div className="relative overflow-hidden" style={{ margin: "0 16px 16px", borderRadius: "10px", height: "clamp(120px,20vw,167px)" }}>
                    <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Beige strip bottom */}
        <div style={{ backgroundColor: "#e6ded5", height: "clamp(32px,5vw,60px)", position: "relative" }} />
      </motion.div>
    </section>
  );
}
