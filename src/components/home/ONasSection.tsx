"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function ONasSection() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden">
      {/* Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-[family-name:var(--font-commissioner)] font-bold text-black/[0.04] whitespace-nowrap leading-none"
          style={{ fontSize: "100px" }}
        >
          O nás
        </span>
      </motion.div>

      <div className="relative" style={{ paddingLeft: "235px", paddingRight: "235px" }}>
        <div className="pt-20 pb-0">
          {/* Photos layout */}
          <div className="relative h-[560px] mb-0">
            {/* Left photo — slides in from left */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease }}
              className="absolute left-0 top-[146px] w-[339px] h-[456px] bg-[var(--color-nude)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[var(--color-nude)]">
                <Image
                  src="/images/o-nas-1.jpg"
                  alt="Spoločenstvo Marana Tha"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-[106px] bg-white/80" />
            </motion.div>

            {/* Right photo — slides in from right */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, delay: 0.15, ease }}
              className="absolute right-0 top-0 w-[339px] h-[456px] bg-[var(--color-nude)] overflow-hidden"
            >
              <Image
                src="/images/o-nas-2.jpg"
                alt="Spoločenstvo Marana Tha"
                fill
                className="object-cover"
              />
              <div className="absolute left-0 right-0 bottom-0 h-[82px] bg-white/80" />
            </motion.div>
          </div>

          {/* Cream strip section */}
          <div className="bg-[var(--color-cream-light)] -mx-[235px] px-[235px] py-12">
            <div className="flex gap-16">
              {/* Left: intro text */}
              <div className="w-[370px] shrink-0">
                <motion.p
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, ease }}
                  className="font-[family-name:var(--font-commissioner)] text-[1.25rem] font-normal text-[var(--color-ink)] leading-relaxed"
                >
                  V spoločenstve Marana Tha môžeš nájsť a zakúsiť priateľskú atmosféru.{" "}
                  Po príchode k nám budeš privítaný ľuďmi, ktorí sa tešia práve na Teba!{" "}
                  Vykroč taký, aký si. Nájdeš tu miesto prijatia a získaš niečo pre seba.
                </motion.p>
              </div>

              {/* Right: columns */}
              <div className="flex-1 flex gap-8">
                {/* Left column */}
                <motion.div
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: 0.12, ease }}
                  className="flex-1"
                >
                  <div className="h-px bg-[var(--color-gold)] mb-6" />
                  <h3 className="font-[family-name:var(--font-commissioner)] text-[1.875rem] font-bold text-[var(--color-ink)] mb-4 leading-tight">
                    Na udalostiach spoločenstva môžeš očakávať
                  </h3>
                  <ul className="font-[family-name:var(--font-commissioner)] text-[1.25rem] font-normal text-[var(--color-ink)] space-y-1">
                    {[
                      "dynamické stretnutia",
                      "chválová hudba",
                      "pútavé prednášky inšpirované Bibliou a cirkevnou tradíciou",
                      "zaujímavé programy pre deti",
                      "audio a video nahrávky zo stretnutí",
                      "zábavné aktivity pre tvoje deti",
                    ].map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Right column */}
                <motion.div
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: 0.24, ease }}
                  className="flex-1"
                >
                  <h3 className="font-[family-name:var(--font-commissioner)] text-[1.875rem] font-bold text-[var(--color-ink)] mb-4 leading-tight">
                    Nájdi svoj ďalší osobný krok
                  </h3>
                  <div className="font-[family-name:var(--font-commissioner)] text-[1.25rem] font-normal text-[var(--color-ink)] space-y-4">
                    {[
                      { bold: "miesto kam patríš", text: " – malé skupinky spoločenstva Marana Tha sú miestom, kde môžeš rásť, smiať sa a pomáhať iným. Máme malé skupinky pre manželské páry, mužov, ženy, mladých, športovcov a ďalších." },
                      { bold: "spôsob rastu", text: " – chceme ťa naučiť ako byť oddaný Ježišovi a prehlbovať tvoj vzťah s ním. Máme pre teba kvalitný program rastu." },
                      { bold: "šanca niečo zmeniť", text: " – Boh ťa stvoril s darmi a zručnosťami, ktorými môžeš spôsobiť zmenu vo svojom okolí." },
                    ].map(({ bold, text }, i) => (
                      <motion.p
                        key={bold}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease }}
                      >
                        <strong>{bold}</strong>{text}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="flex justify-center mt-10"
            >
              <Button href="/o-nas">
                Čítať viac →
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
