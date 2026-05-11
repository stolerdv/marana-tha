import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// No auth check — eventId is an unguessable CUID, admin page is protected by middleware
export async function GET(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");

  const registrations = await db.registration.findMany({
    where: { eventId },
    orderBy: { createdAt: "asc" },
    include: { event: { select: { title: true, slug: true } } },
  });

  if (format === "csv") {
    const SEP = ";"; // Slovak Excel uses semicolons
    const BOM = "﻿"; // UTF-8 BOM so Excel opens correctly

    // Collect extra field keys from data JSON (skip builtin_name/builtin_email since name+email are separate columns)
    const allKeys = new Set<string>();
    registrations.forEach(r => {
      if (r.data && typeof r.data === "object") {
        Object.keys(r.data as object).forEach(k => {
          if (k !== "builtin_name" && k !== "builtin_email") allKeys.add(k);
        });
      }
    });
    const extraKeys = Array.from(allKeys);

    const headerRow = ["Meno", "Email", ...extraKeys, "Dátum"].join(SEP);

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
    const eventTitle = registrations[0]?.event?.title ?? "registracie";
    const filename = `registracie-${eventTitle.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-")}.csv`;

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  return NextResponse.json(registrations);
}
