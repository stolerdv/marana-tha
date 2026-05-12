"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function ONasPossobenie() {
  return (
    <section className="bg-[var(--color-cream)] overflow-hidden">

      {/* ── NAŠE PÔSOBENIE — text left, photo right ── */}
      <div className="flex flex-col lg:flex-row items-center gap-0">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="w-full lg:w-1/2 px-4 sm:px-8 lg:pl-[235px] lg:pr-16 py-12 lg:py-20"
        >
          <div style={{ width: "clamp(0px,100%,440px)" }}>
            <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(24px,3vw,30px)", fontWeight: 700, lineHeight: 1.4, color: "#1c1d1e", marginBottom: "16px" }}>
              Naše pôsobenie
            </h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#bea055", marginBottom: "20px" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "17px", fontWeight: 400, lineHeight: "1.7", color: "#1c1d1e" }}>
              Spoločenstvo Marana Tha pôsobí v troch mestách na východnom Slovensku — v Prešove, Bardejove a Košiciach. Každé z miest má svoju vlastnú skupinu veriacich, ktorí sa pravidelne stretávajú na chválach, modlitbách a formácii.
            </p>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="w-full lg:w-1/2 relative overflow-hidden"
          style={{ height: "clamp(240px,40vw,548px)", borderRadius: "15px 0 0 15px" }}
        >
          <Image src="/images/o-nas-possobenie-1.jpg" alt="Naše pôsobenie" fill className="object-cover" />
        </motion.div>
      </div>

      {/* Gold divider */}
      <div className="px-4 sm:px-8 lg:px-[235px]">
        <div style={{ height: "1px", backgroundColor: "#bea055" }} />
      </div>

      {/* ── NAŠA VÍZIA — photo left, text right ── */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-0">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="w-full lg:w-1/2 px-4 sm:px-8 lg:pr-[235px] lg:pl-16 py-12 lg:py-20"
        >
          <div style={{ width: "clamp(0px,100%,406px)", marginLeft: "auto" }}>
            <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(24px,3vw,30px)", fontWeight: 700, lineHeight: 1.4, color: "#1c1d1e", marginBottom: "16px" }}>
              Naša vízia
            </h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#bea055", marginBottom: "20px" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "17px", fontWeight: 400, lineHeight: "1.7", color: "#1c1d1e" }}>
              Chceme budovať živé kresťanské spoločenstvo, kde každý môže nájsť miesto prijatia, rásť vo viere a prispieť svojimi darmi k Božiemu kráľovstvu. Naším cieľom je evanjelizácia a formácia veriacich v duchu katolíckej tradície.
            </p>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="w-full lg:w-1/2 relative overflow-hidden"
          style={{ height: "clamp(240px,40vw,549px)", borderRadius: "0 15px 15px 0" }}
        >
          <Image src="/images/o-nas-possobenie-2.jpg" alt="Naša vízia" fill className="object-cover" />
        </motion.div>
      </div>

    </section>
  );
}
