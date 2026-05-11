"use client";

import { useState } from "react";
import { AddToCalendar } from "./AddToCalendar";
import Link from "next/link";

const CITIES = ["Prešov", "Košice", "Bardejov"] as const;

interface VCHEvent {
  id: string;
  title: string;
  slug: string;
  startDate: Date;
  endDate: Date | null;
  location: string | null;
  description: string;
}

interface Props {
  eventsByCity: Record<string, VCHEvent[]>;
}

export function VecerChvalCityTabs({ eventsByCity }: Props) {
  const [activeCity, setActiveCity] = useState<string>(CITIES[0]);
  const events = eventsByCity[activeCity] ?? [];

  return (
    <section className="bg-[var(--color-cream)]" style={{ paddingTop: "64px", paddingBottom: "80px" }}>
      <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

        {/* City switcher */}
        <div className="flex gap-3" style={{ marginBottom: "48px" }}>
          {CITIES.map((city) => {
            const active = city === activeCity;
            const count = eventsByCity[city]?.length ?? 0;
            return (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                style={{
                  padding: "12px 28px",
                  borderRadius: "50px",
                  border: active ? "none" : "1px solid #e4d5b2",
                  backgroundColor: active ? "#bea055" : "#ffffff",
                  fontFamily: "var(--font-commissioner)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: active ? "#fdf5f2" : "#635f5b",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {city}
                {count > 0 && (
                  <span style={{
                    backgroundColor: active ? "rgba(255,255,255,0.25)" : "#f3f0ea",
                    color: active ? "#fdf5f2" : "#977d3e",
                    borderRadius: "50px",
                    padding: "1px 8px",
                    fontSize: "12px",
                  }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Events list */}
        {events.length === 0 ? (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "48px", textAlign: "center", border: "1px solid #e4d5b2" }}>
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>
              Momentálne nie sú plánované večery chvál v {activeCity === "Prešov" ? "Prešove" : activeCity === "Košice" ? "Košiciach" : "Bardejove"}.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {events.map((event, i) => (
              <div key={event.id}>
                <div style={{ height: "1px", backgroundColor: "#bea055" }} />
                <div className="flex items-center py-6 gap-6">
                  {/* Big date number */}
                  <div style={{ width: "60px", flexShrink: 0, textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "38px", fontWeight: 700, color: "#bea055", lineHeight: 1 }}>
                      {new Date(event.startDate).getDate()}
                    </p>
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", color: "#977d3e", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {new Date(event.startDate).toLocaleString("sk-SK", { month: "short" })}
                    </p>
                  </div>

                  <div style={{ width: "1px", height: "48px", backgroundColor: "#e4d5b2", flexShrink: 0 }} />

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "22px", fontWeight: 700, color: "#1c1d1e" }}>
                      {event.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "#635f5b", marginTop: "2px" }}>
                      {new Date(event.startDate).toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <AddToCalendar
                      eventId={event.id}
                      title={event.title}
                      description={event.description}
                      startDate={event.startDate}
                      endDate={event.endDate}
                      location={event.location}
                    />
                    {i === 0 && (
                      <Link
                        href={`/udalosti/${event.slug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          height: "50px",
                          paddingLeft: "24px",
                          paddingRight: "24px",
                          backgroundColor: "#bea055",
                          borderRadius: "50px",
                          fontFamily: "var(--font-commissioner)",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#fdf5f2",
                        }}
                      >
                        Detail →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ height: "1px", backgroundColor: "#bea055" }} />
          </div>
        )}

        <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#9ca3af", marginTop: "20px" }}>
          Dátumy sa môžu zmeniť. Sleduj nás na sociálnych sieťach alebo sa prihláš na odber noviniek.
        </p>
      </div>
    </section>
  );
}
