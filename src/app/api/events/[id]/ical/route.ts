import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function toIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = await db.event.findUnique({
    where: { id, published: true },
    select: { title: true, description: true, startDate: true, endDate: true, location: true, slug: true },
  });

  if (!event) {
    return new NextResponse("Not found", { status: 404 });
  }

  const start = toIcsDate(event.startDate);
  const end = event.endDate ? toIcsDate(event.endDate) : toIcsDate(new Date(event.startDate.getTime() + 2 * 60 * 60 * 1000));
  const now = toIcsDate(new Date());
  const uid = `${event.slug}@maranatha.sk`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Marana Tha//SK",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    event.location ? `LOCATION:${escapeIcs(event.location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
    },
  });
}
