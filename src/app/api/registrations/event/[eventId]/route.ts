import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const { eventId } = await params;
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");

    const [registrations, event] = await Promise.all([
      db.registration.findMany({
        where: { eventId },
        orderBy: { createdAt: "asc" },
      }),
      db.event.findUnique({ where: { id: eventId }, select: { title: true, slug: true } }),
    ]);

    if (format === "csv") {
      const SEP = ";";
      const BOM = "﻿";

      const allKeys = new Set<string>();
      for (const r of registrations) {
        if (r.data && typeof r.data === "object") {
          for (const k of Object.keys(r.data as object)) {
            if (k !== "builtin_name" && k !== "builtin_email") allKeys.add(k);
          }
        }
      }
      const extraKeys = Array.from(allKeys);
      const headerRow = ["Meno", "Email", ...extraKeys, "Datum"].join(SEP);

      const rows = registrations.map(r => {
        const extra = extraKeys.map(k => {
          const val = (r.data as Record<string, string>)?.[k] ?? "";
          return `"${String(val).replace(/"/g, '""')}"`;
        });
        return [
          `"${r.name.replace(/"/g, '""')}"`,
          `"${r.email.replace(/"/g, '""')}"`,
          ...extra,
          `"${new Date(r.createdAt).toLocaleDateString("sk-SK")}"`,
        ].join(SEP);
      });

      const csv = BOM + [headerRow, ...rows].join("\r\n");
      const slug = event?.slug ?? eventId;
      const filename = `registracie-${slug}.csv`;

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    return NextResponse.json(registrations);
  } catch (err) {
    console.error("CSV export error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
