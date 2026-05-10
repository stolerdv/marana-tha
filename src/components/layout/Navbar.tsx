"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mindmap structure
const navLeft = [
  { href: "/spolocenstvo", label: "Spoločenstvo", hasDropdown: true },
  { href: "/aktivity", label: "Aktivity", hasDropdown: true },
  { href: "/udalosti", label: "Udalosti" },
];

const navRight = [
  { href: "/media", label: "Médiá", hasDropdown: true },
  { href: "/kontakt", label: "Kontakt" },
];

// Dropdown: Spoločenstvo
const spolocenstvoLinks = [
  { href: "/o-nas", label: "O nás" },
  { href: "/kde-sme", label: "Kde pôsobíme" },
  { href: "/ludia", label: "Náš tím" },
  { href: "/sluzby", label: "Naša služba" },
  { href: "/pridaj-sa", label: "Pridaj sa k nám" },
];

// Dropdown: Aktivity
const aktivityLinks = [
  { href: "/udalosti/vecer-chval", label: "Večer chvál" },
  { href: "/aktivity/piatky-mladych", label: "Piatky pre mladých" },
  { href: "/aktivity/adoracie", label: "Adorácie" },
  { href: "/aktivity/modlitby-uzdravenie", label: "Modlitby uzdr." },
  { href: "/aktivity/kurzy", label: "Kurzy" },
  { href: "/aktivity/misie", label: "Misie" },
];

// Dropdown: Médiá
const mediaLinks = [
  { href: "/media/podcasty", label: "Podcasty" },
  { href: "/blog", label: "Blog" },
  { href: "/media/archiv", label: "Archív" },
];

// External "business" links — M Aréna and M Caffé
const externalLinks = [
  { href: "https://marena.sk", label: "M Aréna", external: true },
  { href: "https://mcaffe.sk", label: "M Caffé", external: true },
];

function DropdownArrow() {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="inline-block ml-1">
      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const dropdownLinks: Record<string, { href: string; label: string }[]> = {
  "/spolocenstvo": spolocenstvoLinks,
  "/aktivity": aktivityLinks,
  "/media": mediaLinks,
};

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginData, setLoginData] = useState({ meno: "", heslo: "" });

  return (
    <header className="absolute top-0 left-0 right-0 z-50">

      {/* ── Top bar: login inputs + business links ── */}
      <div className="flex justify-end items-center gap-3 px-[235px] pt-[28px] pb-[16px]">
        {/* M Aréna / M Caffé — external links */}
        {externalLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-colors hover:text-[var(--color-gold)]"
            style={{ height: "24px", paddingLeft: "12px", paddingRight: "12px", fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#bea055", border: "1px solid #bea055", borderRadius: "50px" }}
          >
            {link.label}
          </a>
        ))}

        {/* Divider */}
        <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(253,245,242,0.3)" }} />

        {/* User icon */}
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" className="text-[var(--color-cream-light)]">
          <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Meno input */}
        <input
          type="text"
          placeholder="Meno"
          value={loginData.meno}
          onChange={(e) => setLoginData({ ...loginData, meno: e.target.value })}
          className="px-3 focus:outline-none"
          style={{ width: "105px", height: "24px", borderRadius: "50px", backgroundColor: "#fdf5f2", fontFamily: "var(--font-commissioner)", fontSize: "12px", color: "var(--color-ink)" }}
        />

        {/* Heslo input */}
        <input
          type="password"
          placeholder="Heslo"
          value={loginData.heslo}
          onChange={(e) => setLoginData({ ...loginData, heslo: e.target.value })}
          className="px-3 focus:outline-none"
          style={{ width: "105px", height: "24px", borderRadius: "50px", backgroundColor: "#fdf5f2", fontFamily: "var(--font-commissioner)", fontSize: "12px", color: "var(--color-ink)" }}
        />

        <Link
          href="/admin"
          className="flex items-center transition-colors hover:bg-[var(--color-gold)]/10"
          style={{ height: "24px", paddingLeft: "16px", paddingRight: "16px", borderRadius: "50px", border: "1px solid #bea055", fontFamily: "var(--font-commissioner)", fontSize: "12px", color: "#fdf5f2" }}
        >
          Vstúpiť
        </Link>
      </div>

      {/* ── Main nav row ── */}
      <nav className="flex items-center justify-between px-[235px] py-3 relative">

        {/* Left nav */}
        <div className="flex items-center gap-8">
          {navLeft.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="font-[family-name:var(--font-commissioner)] text-[0.75rem] text-[var(--color-cream-light)] hover:text-[var(--color-gold)] transition-colors flex items-center gap-0.5"
              >
                {item.label}
                {item.hasDropdown && <DropdownArrow />}
              </Link>

              {item.hasDropdown && dropdownLinks[item.href] && (
                <AnimatePresence>
                  {openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute top-full left-0 mt-2 bg-[var(--color-ink)]/95 border border-[var(--color-gold)]/30 min-w-[180px] z-50 rounded-[8px] overflow-hidden"
                    >
                      {dropdownLinks[item.href].map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 font-[family-name:var(--font-commissioner)] text-[0.75rem] text-[var(--color-cream-light)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Logo centered */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/logo.png"
            alt="Marana Tha"
            width={121}
            height={75}
            priority
            className="h-[75px] w-auto"
          />
        </Link>

        {/* Right nav */}
        <div className="flex items-center gap-8">
          {navRight.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="font-[family-name:var(--font-commissioner)] text-[0.75rem] text-[var(--color-cream-light)] hover:text-[var(--color-gold)] transition-colors flex items-center gap-0.5"
              >
                {item.label}
                {item.hasDropdown && <DropdownArrow />}
              </Link>

              {item.hasDropdown && dropdownLinks[item.href] && (
                <AnimatePresence>
                  {openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute top-full right-0 mt-2 bg-[var(--color-ink)]/95 border border-[var(--color-gold)]/30 min-w-[160px] z-50 rounded-[8px] overflow-hidden"
                    >
                      {dropdownLinks[item.href].map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 font-[family-name:var(--font-commissioner)] text-[0.75rem] text-[var(--color-cream-light)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-[var(--color-cream-light)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--color-ink)]/95 px-6 pb-6"
          >
            {[...spolocenstvoLinks, ...aktivityLinks, { href: "/udalosti", label: "Udalosti" }, ...mediaLinks, { href: "/kontakt", label: "Kontakt" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 font-[family-name:var(--font-commissioner)] text-[0.75rem] text-[var(--color-cream-light)] border-b border-[var(--color-gold)]/20"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-4">
              {externalLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="font-[family-name:var(--font-commissioner)] text-[0.75rem] font-bold"
                  style={{ color: "#bea055" }}>
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
