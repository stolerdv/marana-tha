"use client";

import { useState } from "react";
import Link from "next/link";

interface EventItem {
  id: string;
  title: string;
  slug: string;
  startDate: Date;
  endDate?: Date | null;
  location?: string | null;
  isEveningOfPraise: boolean;
}

interface Props { events: EventItem[]; }

const MONTHS_SK = ["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"];
const DAYS_SK = ["Po","Ut","St","Št","Pi","So","Ne"];

const CITY_COLORS: Record<string, string> = {
  "Prešov": "#bea055",
  "Košice": "#4a7c9b",
  "Bardejov": "#6b8a5e",
};

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

export function EventsCalendarView({ events }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);

  const eventsByDay: Record<number, EventItem[]> = {};
  for (const ev of events) {
    const d = new Date(ev.startDate);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(ev);
    }
  }

  function prevMonth() {
    setSelectedDay(null);
    if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
  }
  function nextMonth() {
    setSelectedDay(null);
    if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
  }

  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedEvents = selectedDay ? (eventsByDay[selectedDay] ?? []) : [];

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #bea055", background: "transparent", cursor: "pointer", color: "#bea055", fontSize: "18px" }}>‹</button>
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "#1c1d1e" }}>
          {MONTHS_SK[month]} {year}
        </p>
        <button onClick={nextMonth} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #bea055", background: "transparent", cursor: "pointer", color: "#bea055", fontSize: "18px" }}>›</button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "4px" }}>
        {DAYS_SK.map(d => (
          <div key={d} style={{ textAlign: "center", fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#977d3e", padding: "6px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid — dots only */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {cells.map((day, i) => {
          const isToday = day !== null && day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isSelected = day === selectedDay;
          const dayEvents = day ? (eventsByDay[day] ?? []) : [];
          const hasEvents = dayEvents.length > 0;

          return (
            <div
              key={i}
              onClick={() => {
                if (!day) return;
                setSelectedDay(isSelected ? null : day);
              }}
              style={{
                minHeight: "52px",
                borderRadius: "8px",
                padding: "6px 4px",
                backgroundColor: isSelected ? "#1c1d1e" : day ? "#ffffff" : "transparent",
                border: isToday ? "2px solid #bea055" : isSelected ? "2px solid #1c1d1e" : day ? "1px solid #e4d5b2" : "none",
                cursor: hasEvents ? "pointer" : day ? "default" : "default",
                transition: "all 0.15s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {day !== null && (
                <>
                  <span style={{
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "13px",
                    fontWeight: isToday || isSelected ? 700 : 400,
                    color: isSelected ? "#fdf5f2" : isToday ? "#977d3e" : "#635f5b",
                  }}>
                    {day}
                  </span>
                  {/* Dots for events */}
                  {hasEvents && (
                    <div className="flex items-center gap-0.5 flex-wrap justify-center">
                      {dayEvents.slice(0, 3).map((ev, di) => (
                        <div key={di} style={{
                          width: "6px", height: "6px", borderRadius: "50%",
                          backgroundColor: isSelected ? "#fdf5f2" : (CITY_COLORS[ev.location ?? ""] ?? "#bea055"),
                          flexShrink: 0,
                        }} />
                      ))}
                      {dayEvents.length > 3 && (
                        <span style={{ fontSize: "9px", color: isSelected ? "#fdf5f2" : "#977d3e", fontWeight: 700, marginLeft: "1px" }}>+{dayEvents.length - 3}</span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day events panel */}
      {selectedDay && selectedEvents.length > 0 && (
        <div className="mt-4 rounded-[12px] overflow-hidden" style={{ border: "1px solid #e4d5b2" }}>
          <div style={{ backgroundColor: "#1c1d1e", padding: "12px 16px" }}>
            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#fdf5f2" }}>
              {selectedDay}. {MONTHS_SK[month]} {year} — {selectedEvents.length} {selectedEvents.length === 1 ? "udalosť" : "udalosti"}
            </p>
          </div>
          <div className="flex flex-col">
            {selectedEvents.map((ev, i) => (
              <Link
                key={ev.id}
                href={ev.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${ev.slug}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-[#f9efe2] transition-colors"
                style={{ borderTop: i > 0 ? "1px solid #e4d5b2" : "none", backgroundColor: "#ffffff" }}
              >
                <div className="flex items-center gap-3">
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: CITY_COLORS[ev.location ?? ""] ?? "#bea055", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#1c1d1e" }}>{ev.title}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#635f5b" }}>
                      {new Date(ev.startDate).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" })}
                      {ev.location && ` · ${ev.location}`}
                    </p>
                  </div>
                </div>
                <span style={{ color: "#bea055", fontSize: "16px" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
