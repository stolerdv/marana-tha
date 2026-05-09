import { db } from "@/lib/db";
import Link from "next/link";
import { DeletePersonButton } from "@/components/admin/DeletePersonButton";

const CITY_LABELS: Record<string, string> = { PRESOV: "Prešov", BARDEJOV: "Bardejov", KOSICE: "Košice" };

export default async function AdminPeoplePage() {
  const people = await db.person.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: {
      ministry: { select: { title: true } },
      cityPage: { select: { city: true } },
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>Ľudia</h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>{people.length} osôb celkom</p>
        </div>
        <Link href="/admin/people/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors hover:bg-[#977d3e]"
          style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}>
          + Pridať osobu
        </Link>
      </div>

      {people.length === 0 ? (
        <div className="rounded-[15px] p-16 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>Zatiaľ žiadni ľudia</p>
          <Link href="/admin/people/new" className="inline-block mt-4" style={{ color: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px" }}>Pridaj prvého →</Link>
        </div>
      ) : (
        <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <div className="grid px-6 py-3 border-b border-[#e4d5b2]" style={{ gridTemplateColumns: "1fr 200px 160px 80px 100px 120px" }}>
            {["Meno", "Rola", "Priradenie", "Por.", "Status", "Akcie"].map(h => (
              <span key={h} style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</span>
            ))}
          </div>
          <div className="divide-y divide-[#e4d5b2]">
            {people.map((p) => (
              <div key={p.id} className="grid items-center px-6 py-4 hover:bg-[#f9efe2] transition-colors" style={{ gridTemplateColumns: "1fr 200px 160px 80px 100px 120px" }}>
                <Link href={`/admin/people/${p.id}`} className="hover:text-[#bea055] transition-colors"
                  style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>
                  {p.name}
                </Link>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>{p.role}</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#292929" }}>
                  {p.ministry?.title ?? (p.cityPage ? CITY_LABELS[p.cityPage.city] : "—")}
                </span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>{p.order}</span>
                <span className="px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: p.published ? "#dcfce7" : "#f3f4f6", color: p.published ? "#16a34a" : "#6b7280", fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500 }}>
                  {p.published ? "Online" : "Draft"}
                </span>
                <div className="flex items-center gap-3">
                  <Link href={`/admin/people/${p.id}`} style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}>Upraviť</Link>
                  <DeletePersonButton id={p.id} name={p.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
