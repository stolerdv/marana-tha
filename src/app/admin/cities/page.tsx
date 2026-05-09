import { db } from "@/lib/db";
import Link from "next/link";

const CITY_LABELS: Record<string, string> = { PRESOV: "Prešov", BARDEJOV: "Bardejov", KOSICE: "Košice" };
const CITY_FLAGS: Record<string, string> = { PRESOV: "🏙️", BARDEJOV: "🏰", KOSICE: "🌆" };

export default async function AdminCitiesPage() {
  const cities = await db.cityPage.findMany({ orderBy: { city: "asc" } });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
          Mestá
        </h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
          Obsah stránok pre každé mesto
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/admin/cities/${city.city.toLowerCase()}`}
            className="flex items-center justify-between px-6 py-5 rounded-[15px] hover:bg-[#f9efe2] transition-colors"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}
          >
            <div className="flex items-center gap-4">
              <span style={{ fontSize: "32px" }}>{CITY_FLAGS[city.city] ?? "📍"}</span>
              <div>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e" }}>
                  {CITY_LABELS[city.city] ?? city.city}
                </p>
                {city.address && (
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginTop: "2px" }}>
                    {city.address}
                  </p>
                )}
              </div>
            </div>
            <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#bea055", fontWeight: 700 }}>
              Upraviť →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
