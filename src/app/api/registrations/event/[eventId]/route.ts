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
    include: { event: { select: { title: true } } },
  });

  // CSV export
  if (format === "csv") {
    if (registrations.length === 0) {
      return new NextResponse("Meno,Email,Dátum\n", {
        headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="registracie.csv"` },
      });
    }

    // Collect all field keys from data JSON
    const allKeys = new Set<string>();
    registrations.forEach(r => {
      if (r.data && typeof r.data === "object") {
        Object.keys(r.data as object).forEach(k => allKeys.add(k));
      }
    });
    const extraKeys = Array.from(allKeys);

    const headers = ["Meno", "Email", ...extraKeys, "Dátum"].join(",");
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
      ].join(",");
    });

    const csv = [headers, ...rows].join("\n");
    const eventTitle = registrations[0]?.event?.title ?? "registracie";
    const filename = `${eventTitle.toLowerCase().replace(/\s+/g, "-")}.csv`;

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  return NextResponse.json(registrations);
}
