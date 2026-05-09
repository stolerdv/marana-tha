import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityPage = await db.cityPage.findUnique({
    where: { city: city.toUpperCase() as "PRESOV" | "BARDEJOV" | "KOSICE" },
  });
  if (!cityPage) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(cityPage);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ city: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { city } = await params;
  const body = await req.json();
  const { title, content, coverImage, address, mapUrl, contactEmail, contactPhone } = body;

  try {
    const cityPage = await db.cityPage.update({
      where: { city: city.toUpperCase() as "PRESOV" | "BARDEJOV" | "KOSICE" },
      data: {
        title: title ?? undefined,
        content: content ?? null,
        coverImage: coverImage ?? null,
        address: address ?? null,
        mapUrl: mapUrl ?? null,
        contactEmail: contactEmail ?? null,
        contactPhone: contactPhone ?? null,
      },
    });
    return NextResponse.json(cityPage);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
