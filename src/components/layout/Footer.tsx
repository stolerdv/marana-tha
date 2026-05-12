"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const footerCols = [
  {
    label: "Spoločenstvo",
    links: [
      { href: "/o-nas", label: "O nás" },
      { href: "/kde-sme", label: "Kde pôsobíme" },
      { href: "/ludia", label: "Náš tím" },
      { href: "/sluzby", label: "Naša služba" },
      { href: "/pridaj-sa", label: "Pridaj sa k nám" },
    ],
  },
  {
    label: "Aktivity",
    links: [
      { href: "/udalosti/vecer-chval", label: "Večer chvál" },
      { href: "/aktivity", label: "Všetky aktivity" },
      { href: "/udalosti", label: "Udalosti" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    label: "Médiá & kontakt",
    links: [
      { href: "/media/podcasty", label: "Podcasty" },
      { href: "/media/archiv", label: "Archív záznamy" },
      { href: "/kontakt", label: "Kontakt" },
      { href: "/podpora", label: "Podpora" },
      { href: "/gdpr", label: "GDPR" },
    ],
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#fdf5f2", opacity: 0.8 }}>
        ✓ Prihlásenie úspešné. Ďakujeme!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="váš@email.sk"
        style={{
          flex: 1,
          height: "38px",
          borderRadius: "50px",
          border: "1px solid rgba(253,245,242,0.3)",
          backgroundColor: "rgba(253,245,242,0.1)",
          padding: "0 14px",
          fontFamily: "var(--font-commissioner)",
          fontSize: "13px",
          color: "#fdf5f2",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          height: "38px",
          paddingLeft: "18px",
          paddingRight: "18px",
          borderRadius: "50px",
          backgroundColor: "#bea055",
          border: "none",
          fontFamily: "var(--font-commissioner)",
          fontSize: "13px",
          fontWeight: 700,
          color: "#fdf5f2",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Prihlásiť
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-gold-deeper)] pt-12 pb-8">
      <div className="max-w-[1512px] mx-auto px-4 sm:px-8 lg:px-[235px]">

        {/* Top row: logo + nav columns + newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-12" style={{ marginBottom: "48px" }}>

          {/* Logo + socials */}
          <div className="flex flex-col gap-6" style={{ flexShrink: 0 }}>
            <Image
              src="/images/logo-beige.png"
              alt="Marana Tha"
              width={217}
              height={52}
              className="h-[40px] sm:h-[52px] w-auto max-w-[180px] sm:max-w-none"
            />
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="text-[var(--color-beige)] hover:text-white transition-colors">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-[var(--color-beige)] hover:text-white transition-colors">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-[var(--color-beige)] hover:text-white transition-colors">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#866f36" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {footerCols.map((col) => (
              <div key={col.label} className="flex flex-col gap-2.5">
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 700, color: "rgba(253,245,242,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                  {col.label}
                </span>
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: 500, color: "rgba(253,245,242,0.8)" }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="w-full sm:w-auto" style={{ maxWidth: "320px", flexShrink: 0 }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 700, color: "rgba(253,245,242,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Odber noviniek
            </p>
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "rgba(253,245,242,0.7)", marginBottom: "14px", lineHeight: "1.5" }}>
              Dostávaj novinky zo spoločenstva priamo do e-mailu.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(253,245,242,0.15)", marginBottom: "28px" }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(253,245,242,0.35)" }}>
            © 2026 Spoločenstvo Marana Tha. Všetky práva vyhradené.
          </p>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(253,245,242,0.3)" }}>
            Made with ♡ by MaranaTha Design 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
