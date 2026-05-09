import { db } from "@/lib/db";
import Link from "next/link";
import { DeleteEventButton } from "@/components/admin/DeleteEventButton";

export default async function AdminEventsPage() {
  const events = await db.event.findMany({
    orderBy: { startDate: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      startDate: true,
      location: true,
      published: true,
      isEveningOfPraise: true,
      _count: { select: { registrations: true } },
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
            Meropriatia
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
            {events.length} meropriatí celkom
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors hover:bg-[#977d3e]"
          style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}
        >
          + Nové meropriatia
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-[15px] p-16 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>
            Zatiaľ žiadne meropriatia
          </p>
          <Link href="/admin/events/new" className="inline-block mt-4" style={{ color: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px" }}>
            Vytvor prvé →
          </Link>
        </div>
      ) : (
        <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          {/* Table header */}
          <div className="grid px-6 py-3 border-b border-[#e4d5b2]" style={{ gridTemplateColumns: "1fr 180px 140px 100px 120px" }}>
            {["Názov", "Dátum", "Miesto", "Registrácie", "Akcie"].map((h) => (
              <span key={h} style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#e4d5b2]">
            {events.map((event) => (
              <div key={event.id} className="grid items-center px-6 py-4 hover:bg-[#f9efe2] transition-colors" style={{ gridTemplateColumns: "1fr 180px 140px 100px 120px" }}>
                {/* Title + badges */}
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="hover:text-[#bea055] transition-colors"
                      style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}
                    >
                      {event.title}
                    </Link>
                    {event.isEveningOfPraise && (
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#e4d5b2", color: "#866f36", fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 500 }}>
                        Večer chvál
                      </span>
                    )}
                    {!event.published && (
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "#f3f4f6", color: "#6b7280", fontFamily: "var(--font-inter)", fontSize: "11px" }}>
                        Draft
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                    /{event.slug}
                  </p>
                </div>

                {/* Date */}
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#292929" }}>
                  {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "short", year: "numeric" })}
                </span>

                {/* Location */}
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>
                  {event.location ?? "—"}
                </span>

                {/* Registrations */}
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#292929" }}>
                  {event._count.registrations}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/events/${event.id}`}
                    style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}
                  >
                    Upraviť
                  </Link>
                  <DeleteEventButton id={event.id} title={event.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
