"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { ZistitViac } from "@/components/shared/ZistitViac";

interface TeamMember {
  name: string;
  role?: string;
  image?: string;
}

interface CityPageProps {
  city: string;
  heroImage: string;
  description: string;
  // Figma: "Kde sa stretávame" event label, e.g. "Večer chvál v PO"
  meetingLabel: string;
  team: TeamMember[];
}

// Figma city frame at y=263 → titleTop=467 (same as kde-sme)
// "Kde sa stretávame" strip structure (all relative to frame top=263):
//   image 8 (1044×243 r=15): y=843 from section top (absolute y=1106)
//   Rectangle 51 (dark #292929 939×172 r=15): y=879 (36px from photo top)
//   "Kde sa stretávame" title: Inter 700 50px, y=896 (53px from photo top)
//   Location pill: Inter 400 20px, y=976 (133px from photo top)
//   Beige strip (#e6ded5 1044×123 r=15): y=1000 (overlaps photo bottom, 157px from photo top)
//
// Líderský tím section (relative to frame top):
//   Watermark "líderský tím" 100px: y=1165
//   Subtitle 50px gold-dark: y=1202
//   5 team cards (174×310px each, gap 43px): y=1416

export function CityPage({ city, heroImage, description, meetingLabel, team }: CityPageProps) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — titleTop=467 (frame at y=263, title absolute y=730) */}
        <PageHero
          title={city}
          description={description}
          image={heroImage}
          titleTop={467}
        />

        {/* ── KDE SA STRETÁVAME strip ── */}
        {/* Starts at y=843 from section top (= after hero 990px, this section starts 17px gap after hero bg end ≈ just append below) */}
        {/* We use a wrapper section then the overlapping strips inside */}
        <section className="bg-[var(--color-cream)] overflow-hidden px-4 sm:px-8 lg:px-[235px]">
          <div className="relative" style={{ width: "1044px" }}>

            {/* Photo strip — Figma: image 8, 1044×243, r=15 */}
            <div
              className="relative overflow-hidden"
              style={{ width: "1044px", height: "243px", borderRadius: "15px" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${heroImage}')`, filter: "grayscale(80%)" }}
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* Dark band — Figma: Rectangle 51, 939×172, #292929, r=15, at 36px from photo top */}
              <div
                className="absolute"
                style={{
                  left: "53px",   // (1044-939)/2 = 52.5px ≈ 53
                  top: "36px",
                  width: "939px",
                  height: "172px",
                  backgroundColor: "#292929",
                  borderRadius: "15px",
                }}
              >
                {/* "Kde sa stretávame" title — Figma: Inter 700 50px #fdf5f2, at 53px from photo top = 17px from band top */}
                <div
                  className="flex flex-col items-center justify-center"
                  style={{ paddingTop: "17px" }}
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
                    Kde sa stretávame
                  </span>

                  {/* Location pill — Figma: Rectangle 53 (308×47 r=75 outline) + "Večer chvál v PO" Inter 400 20px */}
                  {/* At y=133px from photo top = 97px from band top */}
                  <div
                    className="flex items-center justify-center"
                    style={{
                      marginTop: "14px",
                      height: "47px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      border: "1px solid rgba(253,245,242,0.6)",
                      borderRadius: "75px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "20px",
                        fontWeight: 400,
                        lineHeight: "40px",
                        color: "#fdf5f2",
                      }}
                    >
                      {meetingLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Beige strip — Figma: Rectangle 84, 1044×123, #e6ded5, r=15 */}
            {/* Overlaps photo bottom by 86px (157px into photo, covers last 86px) */}
            <div
              style={{
                width: "1044px",
                height: "123px",
                backgroundColor: "#e6ded5",
                borderRadius: "15px",
                marginTop: "-86px",   // overlaps photo bottom by 86px
                position: "relative",
                zIndex: 0,
              }}
            />
          </div>
        </section>

        {/* ── LÍDERSKÝ TÍM section ── */}
        {/* Starts at y=1165 from frame top (=1165-990=175px below "kde sa stretavame" section end at ~1123) */}
        <section
          className="relative bg-[var(--color-cream)] overflow-hidden"
          style={{ paddingTop: "42px", paddingBottom: "80px" }}
        >
          {/* Watermark "líderský tím" — Figma: Commissioner 700 100px ls=10 */}
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
            líderský tím
          </div>

          <div className="relative px-4 sm:px-8 lg:px-[235px]">
            {/* Subtitle — Figma: Commissioner 400 50px #977d3e lh=55px */}
            <p
              style={{
                fontFamily: "var(--font-commissioner)",
                fontSize: "50px",
                fontWeight: 400,
                lineHeight: "55px",
                color: "#977d3e",
                marginBottom: "48px",
              }}
            >
              líderský tím
            </p>

            {/* 5 team cards — Figma: Group 73 1042×310, each card 174×310 r=15, gap 43px */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-between gap-4 lg:gap-0">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white"
                  style={{ width: "174px", height: "310px", borderRadius: "15px", overflow: "hidden" }}
                >
                  {/* Photo — Figma: image 18, ~154×198 or ~106×125, r=15, at top 11px */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      margin: "11px auto 0",
                      width: "154px",
                      height: "198px",
                      borderRadius: "15px",
                      backgroundColor: "#e6ded5",
                    }}
                  >
                    {member.image && (
                      <Image src={member.image} alt={member.name} fill className="object-cover object-top" />
                    )}
                  </div>

                  {/* Name — Figma: Inter 400 22px lh=31.9px #000000, at ~215px from card top */}
                  <div style={{ padding: "10px 17px 0" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "22px",
                        fontWeight: 400,
                        lineHeight: "31.9px",
                        color: "#000000",
                      }}
                    >
                      {member.name}
                    </p>
                    {member.role && (
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#977d3e",
                        }}
                      >
                        {member.role}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}
