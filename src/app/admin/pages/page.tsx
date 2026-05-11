import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PAGES = [
  { key: "home",     label: "Hlavná stránka",  desc: "Hero text, podnadpis, tlačidlo", icon: "🏠", href: "/" },
  { key: "o-nas",    label: "O nás",           desc: "Úvodný text, foto, štatistiky, hodnoty", icon: "👥", href: "/o-nas" },
  { key: "kde-sme",  label: "Kde pôsobíme",    desc: "Úvodný text, popis", icon: "📍", href: "/kde-sme" },
  { key: "pridaj-sa",label: "Pridaj sa k nám", desc: "Úvodný text, foto", icon: "🤝", href: "/pridaj-sa" },
  { key: "kontakt",  label: "Kontakt",         desc: "Adresa, telefón, email, mapa", icon: "✉️", href: "/kontakt" },
  { key: "sluzby",   label: "Naša služba",     desc: "Úvodný text nad sieťou služieb", icon: "🙏", href: "/sluzby" },
];

export default async function AdminPagesPage() {
  const saved = await db.pageContent.findMany({ select: { key: true, updatedAt: true } });
  const savedMap = Object.fromEntries(saved.map(p => [p.key, p.updatedAt]));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
          Stránky
        </h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
          Upravuj texty a fotografie hlavných stránok webu
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PAGES.map(page => {
          const lastEdit = savedMap[page.key];
          return (
            <div key={page.key} className="flex items-center justify-between px-6 py-5 rounded-[15px]"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
              <div className="flex items-center gap-4">
                <span style={{ fontSize: "24px" }}>{page.icon}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>
                    {page.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginTop: "2px" }}>
                    {page.desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {lastEdit ? (
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af" }}>
                    Upravené {new Date(lastEdit).toLocaleDateString("sk-SK")}
                  </span>
                ) : (
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#bea055", fontWeight: 600 }}>
                    Predvolený obsah
                  </span>
                )}
                <div className="flex gap-2">
                  <a href={page.href} target="_blank" rel="noopener noreferrer"
                    style={{ padding: "8px 16px", borderRadius: "50px", border: "1px solid #e4d5b2", fontFamily: "var(--font-commissioner)", fontSize: "13px", color: "#635f5b", fontWeight: 700 }}>
                    👁 Zobraziť
                  </a>
                  <Link href={`/admin/pages/${page.key}`}
                    className="inline-flex items-center px-5 py-2 rounded-full transition-colors hover:bg-[#977d3e]"
                    style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#fdf5f2" }}>
                    Upraviť →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
