export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const [eventCount, publishedCount, registrationCount] = await Promise.all([
    db.event.count(),
    db.event.count({ where: { published: true } }),
    db.registration.count(),
  ]);

  const upcomingEvents = await db.event.findMany({
    where: { startDate: { gte: new Date() }, published: true },
    orderBy: { startDate: "asc" },
    take: 5,
    select: { id: true, title: true, startDate: true, location: true, _count: { select: { registrations: true } } },
  });

  const stats = [
    { label: "Všetky akcie", value: eventCount, color: "#bea055" },
    { label: "Publikované", value: publishedCount, color: "#977d3e" },
    { label: "Registrácie", value: registrationCount, color: "#866f36" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
          Dashboard
        </h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
          Vitajte v admin paneli Marana Tha
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[15px] p-6"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}
          >
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {stat.label}
            </p>
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "48px", fontWeight: 700, color: stat.color, lineHeight: 1.1, marginTop: "8px" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Upcoming events */}
      <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4d5b2]">
          <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e" }}>
            Najbližšie akcie
          </h2>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-[#977d3e]"
            style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#fdf5f2" }}
          >
            + Nová akcia
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "#635f5b" }}>
              Žiadne nadchádzajúce akcie
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#e4d5b2]">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/admin/events/${event.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-[#f9efe2] transition-colors"
              >
                <div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>
                    {event.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b", marginTop: "2px" }}>
                    {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    {event.location && ` · ${event.location}`}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b" }}>
                    {event._count.registrations} registrácií
                  </span>
                  <span style={{ fontSize: "18px", color: "#bea055" }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
