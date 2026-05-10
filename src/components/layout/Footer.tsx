import Image from "next/image";
import Link from "next/link";

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
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-gold-deeper)] pt-10 pb-8">
      <div className="max-w-[1044px] mx-auto px-[235px] flex flex-col gap-8" style={{ maxWidth: "1512px", paddingLeft: "235px", paddingRight: "235px" }}>
        <div className="flex items-start justify-between">
          {/* Logo + socials */}
          <div className="flex flex-col gap-6">
            <Image
              src="/images/logo-beige.png"
              alt="Marana Tha"
              width={217}
              height={52}
              className="h-[52px] w-auto"
            />
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="text-[var(--color-beige)] hover:text-white transition-colors">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-[var(--color-beige)] hover:text-white transition-colors">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-[var(--color-beige)] hover:text-white transition-colors">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#866f36" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16">
            {footerCols.map((col) => (
              <div key={col.label} className="flex flex-col gap-3">
                <span className="font-[family-name:var(--font-inter)] text-[1rem] font-medium text-[var(--color-beige)] uppercase tracking-wide">
                  {col.label}
                </span>
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-[family-name:var(--font-inter)] text-[1rem] font-medium text-[var(--color-beige)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div className="h-px bg-[var(--color-beige)]/30" />

        {/* Bottom row */}
        <div className="flex items-center justify-center">
          {/* MaranaTha wordmark */}
          <div className="flex flex-col items-center gap-2">
            <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
              <circle cx="31" cy="31" r="30" stroke="#fdf5f2" strokeWidth="1" />
              <path d="M31 10 L31 52 M20 20 L31 10 L42 20" stroke="#fdf5f2" strokeWidth="1.5" />
            </svg>
            <span className="font-[family-name:var(--font-commissioner)] text-[0.9375rem] font-bold text-[var(--color-cream-warm)] text-center">
              Made with ♡ by MaranaTha Design 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
