"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  eventId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date | null;
  location?: string | null;
}

function toGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function AddToCalendar({ eventId, title, description, startDate, endDate, location }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const end = endDate ?? new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const googleUrl = new URL("https://calendar.google.com/calendar/render");
  googleUrl.searchParams.set("action", "TEMPLATE");
  googleUrl.searchParams.set("text", title);
  googleUrl.searchParams.set("dates", `${toGoogleDate(startDate)}/${toGoogleDate(end)}`);
  googleUrl.searchParams.set("details", description);
  if (location) googleUrl.searchParams.set("location", location);

  const icsUrl = `/api/events/${eventId}/ical`;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 transition-colors hover:opacity-80"
        style={{
          height: "50px",
          paddingLeft: "24px",
          paddingRight: "24px",
          borderRadius: "50px",
          border: "2px solid #bea055",
          backgroundColor: "transparent",
          fontFamily: "var(--font-commissioner)",
          fontSize: "15px",
          fontWeight: 700,
          color: "#bea055",
          cursor: "pointer",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="2" width="14" height="13" rx="2" />
          <path d="M1 6h14M5 1v2M11 1v2" strokeLinecap="round" />
        </svg>
        Pridať do kalendára
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
          <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 z-50 overflow-hidden"
          style={{
            backgroundColor: "#1c1d1e",
            border: "1px solid rgba(190,160,85,0.3)",
            borderRadius: "10px",
            minWidth: "210px",
          }}
        >
          <a
            href={googleUrl.toString()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(190,160,85,0.1)] transition-colors"
            style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 600, color: "#fdf5f2" }}
            onClick={() => setOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="17" rx="2" stroke="#4285F4" strokeWidth="1.5" />
              <path d="M3 9h18" stroke="#4285F4" strokeWidth="1.5" />
              <path d="M8 2v4M16 2v4" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Google Calendar
          </a>
          <div style={{ height: "1px", backgroundColor: "rgba(190,160,85,0.15)" }} />
          <a
            href={icsUrl}
            download
            className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(190,160,85,0.1)] transition-colors"
            style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 600, color: "#fdf5f2" }}
            onClick={() => setOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bea055" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
              <path d="M8 14l4 4 4-4M12 18v-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
}
