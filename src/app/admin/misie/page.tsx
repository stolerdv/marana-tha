export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import Link from "next/link";
import { DeleteMissionButton } from "@/components/admin/DeleteMissionButton";

export default async function AdminMisiePage() {
  const missions = await db.mission.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, title: true, slug: true, country: true, order: true, published: true },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
            Misie
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
            {missions.length} misií celkom
          </p>
        </div>
        <Link href="/admin/misie/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors hover:bg-[#977d3e]"
          style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}>
          + Nová misia
        </Link>
      </div>

      {missions.length === 0 ? (
        <div className="rounded-[15px] p-16 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>Zatiaľ žiadne misie</p>
          <Link href="/admin/misie/new" className="inline-block mt-4" style={{ color: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px" }}>
            Vytvor prvú →
          </Link>
        </div>
      ) : (
        <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <div className="grid px-6 py-3 border-b border-[#e4d5b2]" style={{ gridTemplateColumns: "1fr 160px 80px 100px 120px" }}>
            {["Názov", "Krajina", "Poradie", "Status", "Akcie"].map(h => (
              <span key={h} style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</span>
            ))}
          </div>
          <div className="divide-y divide-[#e4d5b2]">
            {missions.map((m) => (
              <div key={m.id} className="grid items-center px-6 py-4 hover:bg-[#f9efe2] transition-colors" style={{ gridTemplateColumns: "1fr 160px 80px 100px 120px" }}>
                <div>
                  <Link href={`/admin/misie/${m.id}`} className="hover:text-[#bea055] transition-colors"
                    style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>
                    {m.title}
                  </Link>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>/misie/{m.slug}</p>
                </div>
                <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#635f5b" }}>{m.country}</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>{m.order}</span>
                <span className="px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: m.published ? "#dcfce7" : "#f3f4f6", color: m.published ? "#16a34a" : "#6b7280", fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500 }}>
                  {m.published ? "Online" : "Draft"}
                </span>
                <div className="flex items-center gap-3">
                  <Link href={`/admin/misie/${m.id}`} style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}>Upraviť</Link>
                  <DeleteMissionButton id={m.id} title={m.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
