import { db } from "@/lib/db";
import Link from "next/link";
import { DeleteMinistryButton } from "@/components/admin/DeleteMinistryButton";

export default async function AdminMinistriesPage() {
  const ministries = await db.ministry.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: {
      id: true, title: true, slug: true, order: true,
      published: true, icon: true,
      _count: { select: { people: true } },
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
            Naša služba
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
            {ministries.length} služieb celkom
          </p>
        </div>
        <Link href="/admin/ministries/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors hover:bg-[#977d3e]"
          style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}>
          + Nová služba
        </Link>
      </div>

      {ministries.length === 0 ? (
        <div className="rounded-[15px] p-16 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>Zatiaľ žiadne služby</p>
          <Link href="/admin/ministries/new" className="inline-block mt-4" style={{ color: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px" }}>
            Vytvor prvú →
          </Link>
        </div>
      ) : (
        <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <div className="grid px-6 py-3 border-b border-[#e4d5b2]" style={{ gridTemplateColumns: "40px 1fr 80px 100px 100px 120px" }}>
            {["#", "Názov", "Poradie", "Ľudia", "Status", "Akcie"].map(h => (
              <span key={h} style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</span>
            ))}
          </div>
          <div className="divide-y divide-[#e4d5b2]">
            {ministries.map((m) => (
              <div key={m.id} className="grid items-center px-6 py-4 hover:bg-[#f9efe2] transition-colors" style={{ gridTemplateColumns: "40px 1fr 80px 100px 100px 120px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "18px" }}>{m.icon ?? "📌"}</span>
                <div>
                  <Link href={`/admin/ministries/${m.id}`} className="hover:text-[#bea055] transition-colors"
                    style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>
                    {m.title}
                  </Link>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>/{m.slug}</p>
                </div>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>{m.order}</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#292929" }}>{m._count.people}</span>
                <span className="px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: m.published ? "#dcfce7" : "#f3f4f6", color: m.published ? "#16a34a" : "#6b7280", fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500 }}>
                  {m.published ? "Online" : "Draft"}
                </span>
                <div className="flex items-center gap-3">
                  <Link href={`/admin/ministries/${m.id}`} style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}>Upraviť</Link>
                  <DeleteMinistryButton id={m.id} title={m.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
