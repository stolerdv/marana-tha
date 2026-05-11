"use client";

import { useState } from "react";
import Link from "next/link";
import { EventsCalendarView } from "./EventsCalendarView";
import { CityBadge } from "@/components/shared/CityBadge";

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

const CITY_FILTERS = ["Všetky", "Prešov", "Košice", "Bardejov"] as const;
type CityFilter = (typeof CITY_FILTERS)[number];

function filterByCity(events: EventItem[], city: CityFilter) {
  if (city === "Všetky") return events;
  return events.filter(e => e.location === city);
}

export function UdaiostiPageClient({ upcoming, past }: Props) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [city, setCity] = useState<CityFilter>("Všetky");

  const filteredUpcoming = filterByCity(upcoming, city);
  const filteredPast = filterByCity(past, city);
  const allFiltered = filterByCity([...upcoming, ...past], city);

  return (
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* Top row: title + view toggle */}
        <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e" }}>
            Nadchádzajúce udalosti
          </p>
          <div className="flex gap-2" style={{ backgroundColor: "#ffffff", borderRadius: "50px", padding: "4px", border: "1px solid #e4d5b2" }}>
            {(["list", "calendar"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "8px 20px", borderRadius: "50px", border: "none", cursor: "pointer",
                fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700,
                backgroundColor: view === v ? "#bea055" : "transparent",
                color: view === v ? "#fdf5f2" : "#635f5b", transition: "all 0.15s",
              }}>
                {v === "list" ? "Zoznam" : "Kalendár"}
              </button>
            ))}
          </div>
        </div>

        {/* City filter tabs */}
        <div className="flex gap-2" style={{ marginBottom: "40px" }}>
          {CITY_FILTERS.map((c) => {
            const active = c === city;
            const count = c === "Všetky" ? upcoming.length : upcoming.filter(e => e.location === c).length;
            return (
              <button key={c} onClick={() => setCity(c)} style={{
                padding: "8px 20px", borderRadius: "50px", cursor: "pointer",
                border: active ? "none" : "1px solid #e4d5b2",
                backgroundColor: active ? "#1c1d1e" : "#ffffff",
                fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700,
                color: active ? "#fdf5f2" : "#635f5b", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                {c}
                {count > 0 && (
                  <span style={{
                    backgroundColor: active ? "rgba(255,255,255,0.2)" : "#f3f0ea",
                    color: active ? "#fdf5f2" : "#977d3e",
                    borderRadius: "50px", padding: "0 7px", fontSize: "12px",
                  }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Calendar view */}
        {view === "calendar" && (
          <div style={{ marginBottom: "60px" }}>
            <EventsCalendarView events={allFiltered} />
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <>
            {filteredUpcoming.length === 0 ? (
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b", marginBottom: "60px" }}>
                {city === "Všetky" ? "Momentálne žiadne plánované akcie." : `Momentálne žiadne akcie v ${city === "Prešov" ? "Prešove" : city === "Košice" ? "Košiciach" : "Bardejove"}.`}
              </p>
            ) : (
              <div className="flex flex-col" style={{ marginBottom: "60px" }}>
                {filteredUpcoming.map((event) => (
                  <div key={event.id}>
                    <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                    <Link
                      href={event.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${event.slug}`}
                      className="flex items-start py-6 hover:bg-[#f9efe2] transition-colors px-2 -mx-2 rounded-[8px]"
                    >
                      <div style={{ flex: 1 }}>
                        <div className="flex items-center gap-3 flex-wrap">
                          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#1c1d1e", lineHeight: "1.3" }}>
                            {event.title}
                          </p>
                          {event.location && <CityBadge city={event.location} size="md" />}
                        </div>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b", marginTop: "4px" }}>
                          {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "24px", color: "#bea055", marginTop: "4px" }}>→</span>
                    </Link>
                  </div>
                ))}
                <div style={{ height: "1px", backgroundColor: "#bea055" }} />
              </div>
            )}

            {filteredPast.length > 0 && (
              <>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "40px" }}>
                  Minulé udalosti
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                  {filteredPast.map((event) => (
                    <Link key={event.id}
                      href={event.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${event.slug}`}
                      className="group rounded-[15px] overflow-hidden"
                      style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}
                    >
                      <div className="relative overflow-hidden" style={{ height: "180px", backgroundColor: "#e6ded5" }}>
                        {event.coverImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={event.coverImage} alt={event.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            className="group-hover:scale-105 transition-transform duration-300" />
                        )}
                      </div>
                      <div style={{ padding: "16px 20px" }}>
                        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>{event.title}</p>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginTop: "4px" }}>
                          {new Date(event.startDate).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}
                          {event.location && ` · ${event.location}`}
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
