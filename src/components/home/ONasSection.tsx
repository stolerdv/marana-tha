"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function ONasSection() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-[family-name:var(--font-commissioner)] font-bold text-black/[0.04] whitespace-nowrap leading-none"
          style={{ fontSize: "100px" }}
        >
          O nás
        </span>
      </div>

      <div className="relative" style={{ paddingLeft: "235px", paddingRight: "235px" }}>
        <div className="pt-20 pb-0">
          {/* Photos layout: two photos side by side with white frames */}
          <div className="relative h-[560px] mb-0">
            {/* Left photo */}
            <div className="absolute left-0 top-[146px] w-[339px] h-[456px] bg-[var(--color-nude)] overflow-hidden">
              <div className="absolute inset-0 bg-[var(--color-nude)]">
                {/* Photo placeholder — replace with actual image */}
                <Image
                  src="/images/o-nas-1.jpg"
                  alt="Spoločenstvo Marana Tha"
                  fill
                  className="object-cover"
                />
              </div>
              {/* White left accent strip */}
              <div className="absolute left-0 top-0 bottom-0 w-[106px] bg-white/80" />
            </div>

            {/* Right photo */}
            <div className="absolute right-0 top-0 w-[339px] h-[456px] bg-[var(--color-nude)] overflow-hidden">
              <Image
                src="/images/o-nas-2.jpg"
                alt="Spoločenstvo Marana Tha"
                fill
                className="object-cover"
              />
              {/* White bottom accent */}
              <div className="absolute left-0 right-0 bottom-0 h-[82px] bg-white/80" />
            </div>
          </div>

          {/* Cream strip section */}
          <div className="bg-[var(--color-cream-light)] -mx-[235px] px-[235px] py-12">
            <div className="flex gap-16">
              {/* Left: intro text */}
              <div className="w-[370px] shrink-0">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
                <div className="flex-1">
                  <div className="h-px bg-[var(--color-gold)] mb-6" />
                  <h3 className="font-[family-name:var(--font-commissioner)] text-[1.875rem] font-bold text-[var(--color-ink)] mb-4 leading-tight">
                    Na udalostiach spoločenstva môžeš očakávať
                  </h3>
                  <ul className="font-[family-name:var(--font-commissioner)] text-[1.25rem] font-normal text-[var(--color-ink)] space-y-1">
                    <li>dynamické stretnutia</li>
                    <li>chválová hudba</li>
                    <li>pútavé prednášky inšpirované Bibliou a cirkevnou tradíciou</li>
                    <li>zaujímavé programy pre deti</li>
                    <li>audio a video nahrávky zo stretnutí</li>
                    <li>zábavné aktivity pre tvoje deti</li>
                  </ul>
                </div>

                {/* Right column */}
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-commissioner)] text-[1.875rem] font-bold text-[var(--color-ink)] mb-4 leading-tight">
                    Nájdi svoj ďalší osobný krok
                  </h3>
                  <div className="font-[family-name:var(--font-commissioner)] text-[1.25rem] font-normal text-[var(--color-ink)] space-y-4">
                    <p>
                      <strong>miesto kam patríš</strong> – malé skupinky spoločenstva Marana Tha sú miestom,
                      kde môžeš rásť, smiať sa a pomáhať iným. Máme malé skupinky pre manželské páry,
                      mužov, ženy, mladých, športovcov a ďalších.
                    </p>
                    <p>
                      <strong>spôsob rastu</strong> – chceme ťa naučiť ako byť oddaný Ježišovi a prehlbovať
                      tvoj vzťah s ním. Máme pre teba kvalitný program rastu.
                    </p>
                    <p>
                      <strong>šanca niečo zmeniť</strong> – Boh ťa stvoril s darmi a zručnosťami, ktorými
                      môžeš spôsobiť zmenu vo svojom okolí.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <Button href="/o-nas">
                Čítať viac →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
