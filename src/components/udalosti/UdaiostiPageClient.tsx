"use client";

import { useState } from "react";
import Link from "next/link";
import { EventsCalendarView } from "./EventsCalendarView";

interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string | null;
  startDate: Date;
  endDate: Date | null;
  location: string | null;
  isEveningOfPraise: boolean;
}

interface Props {
  upcoming: EventItem[];
  past: EventItem[];
}

export function UdaiostiPageClient({ upcoming, past }: Props) {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* View toggle */}
        <div className="flex items-center justify-between mb-10">
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e" }}>
            Nadchádzajúce udalosti
          </p>
          <div className="flex gap-2" style={{ backgroundColor: "#ffffff", borderRadius: "50px", padding: "4px", border: "1px solid #e4d5b2" }}>
            <button
              onClick={() => setView("list")}
              style={{
                padding: "8px 20px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-commissioner)",
                fontSize: "14px",
                fontWeight: 700,
                backgroundColor: view === "list" ? "#bea055" : "transparent",
                color: view === "list" ? "#fdf5f2" : "#635f5b",
                transition: "all 0.15s",
              }}
            >
              Zoznam
            </button>
            <button
              onClick={() => setView("calendar")}
              style={{
                padding: "8px 20px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-commissioner)",
                fontSize: "14px",
                fontWeight: 700,
                backgroundColor: view === "calendar" ? "#bea055" : "transparent",
                color: view === "calendar" ? "#fdf5f2" : "#635f5b",
                transition: "all 0.15s",
              }}
            >
              Kalendár
            </button>
          </div>
        </div>

        {/* Calendar view */}
        {view === "calendar" && (
          <div style={{ marginBottom: "60px" }}>
            <EventsCalendarView events={[...upcoming, ...past]} />
          </div>
        )}

        {/* List view — upcoming */}
        {view === "list" && (
          <>
            {upcoming.length === 0 ? (
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b", marginBottom: "60px" }}>
                Momentálne žiadne plánované meropriatia.
              </p>
            ) : (
              <div className="flex flex-col" style={{ marginBottom: "60px" }}>
                {upcoming.map((event) => (
                  <div key={event.id}>
                    <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                    <Link
                      href={event.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${event.slug}`}
                      className="flex items-start py-6 hover:bg-[#f9efe2] transition-colors px-2 -mx-2 rounded-[8px]"
                    >
                      <div className="flex-1">
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", lineHeight: "1.3" }}>
                          {event.title}
                        </p>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 400, color: "#635f5b", marginTop: "4px" }}>
                          {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          {event.location && ` · ${event.location}`}
                        </p>
                      </div>
                      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "24px", color: "#bea055", marginTop: "4px" }}>→</span>
                    </Link>
                  </div>
                ))}
                <div style={{ height: "1px", backgroundColor: "#bea055" }} />
              </div>
            )}

            {/* Past events */}
            {past.length > 0 && (
              <>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "40px" }}>
                  Minulé udalosti
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                  {past.map((event) => (
                    <Link
                      key={event.id}
                      href={event.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${event.slug}`}
                      className="group rounded-[15px] overflow-hidden"
                      style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}
                    >
                      <div className="relative overflow-hidden" style={{ height: "180px", backgroundColor: "#e6ded5" }}>
                        {event.coverImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={event.coverImage}
                            alt={event.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            className="group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div style={{ padding: "16px 20px" }}>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>
                          {event.title}
                        </p>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginTop: "4px" }}>
                          {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
