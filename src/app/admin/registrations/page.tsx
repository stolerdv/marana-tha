export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminRegistrationsPage() {
  const events = await db.event.findMany({
    where: { hasForm: true },
    orderBy: { startDate: "desc" },
    select: {
      id: true, title: true, startDate: true, slug: true,
      _count: { select: { registrations: true } },
    },
  });

  const totalRegs = events.reduce((s, e) => s + e._count.registrations, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
          Registrácie
        </h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
          {totalRegs} registrácií celkom, {events.length} akcií s formulárom
        </p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-[15px] p-16 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>
            Žiadne akcie s registračným formulárom.
          </p>
          <Link href="/admin/events" className="inline-block mt-4" style={{ color: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px" }}>
            Pridaj formulár k akcii →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div key={event.id} className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>
                    {event.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginTop: "2px" }}>
                    {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  {/* Registration count */}
                  <div className="text-center">
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#bea055", lineHeight: 1 }}>
                      {event._count.registrations}
                    </p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#635f5b" }}>registrácií</p>
                  </div>

                  {/* CSV download */}
                  {event._count.registrations > 0 && (
                    <a
                      href={`/api/registrations/event/${event.id}?format=csv`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors hover:bg-[#977d3e]"
                      style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#fdf5f2" }}
                    >
                      ↓ Stiahnuť CSV
                    </a>
                  )}

                  {/* View event */}
                  <Link
                    href={`/admin/events/${event.id}`}
                    style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#635f5b" }}
                  >
                    Upraviť →
                  </Link>
                </div>
              </div>

              {/* Registration list preview */}
              <RegistrationsList eventId={event.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function RegistrationsList({ eventId }: { eventId: string }) {
  const regs = await db.registration.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  if (regs.length === 0) return null;

  return (
    <div className="border-t border-[#e4d5b2]">
      <div className="grid px-6 py-2" style={{ gridTemplateColumns: "1fr 200px 140px" }}>
        {["Meno", "Email", "Dátum"].map(h => (
          <span key={h} style={{ fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 500, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</span>
        ))}
      </div>
      {regs.map((reg) => (
        <div key={reg.id} className="grid items-center px-6 py-3 border-t border-[#f3f4f6]" style={{ gridTemplateColumns: "1fr 200px 140px" }}>
          <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#1c1d1e" }}>{reg.name}</span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>{reg.email}</span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#9ca3af" }}>
            {new Date(reg.createdAt).toLocaleDateString("sk-SK")}
          </span>
        </div>
      ))}
    </div>
  );
}
