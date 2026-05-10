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

interface Props {
  events: EventItem[];
}

const MONTHS_SK = ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"];
const DAYS_SK = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // 0=Sun, convert to Mon-start (0=Mon)
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function EventsCalendarView({ events }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Map events to their day numbers for this month/year
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
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  // Build grid cells: empty cells before first day + day cells
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #bea055", background: "transparent", cursor: "pointer", color: "#bea055", fontSize: "18px" }}
        >
          ‹
        </button>
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>
          {MONTHS_SK[month]} {year}
        </p>
        <button
          onClick={nextMonth}
          style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #bea055", background: "transparent", cursor: "pointer", color: "#bea055", fontSize: "18px" }}
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "4px" }}>
        {DAYS_SK.map(d => (
          <div key={d} style={{ textAlign: "center", fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#977d3e", padding: "8px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {cells.map((day, i) => {
          const isToday = day !== null && day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const dayEvents = day ? (eventsByDay[day] ?? []) : [];
          return (
            <div
              key={i}
              style={{
                minHeight: "80px",
                borderRadius: "8px",
                padding: "8px",
                backgroundColor: day ? "#ffffff" : "transparent",
                border: isToday ? "2px solid #bea055" : day ? "1px solid #e4d5b2" : "none",
                position: "relative",
              }}
            >
              {day !== null && (
                <>
                  <p style={{
                    fontFamily: "var(--font-commissioner)",
                    fontSize: "14px",
                    fontWeight: isToday ? 700 : 400,
                    color: isToday ? "#977d3e" : "#635f5b",
                    marginBottom: "4px",
                  }}>
                    {day}
                  </p>
                  <div className="flex flex-col gap-1">
                    {dayEvents.map(ev => (
                      <Link
                        key={ev.id}
                        href={ev.isEveningOfPraise ? "/udalosti/vecer-chval" : `/udalosti/${ev.slug}`}
                        style={{
                          display: "block",
                          backgroundColor: "#bea055",
                          borderRadius: "4px",
                          padding: "2px 6px",
                          fontFamily: "var(--font-commissioner)",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#fdf5f2",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        title={ev.title}
                      >
                        {ev.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
