import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const people = await db.person.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: {
        ministry: { select: { id: true, title: true } },
        cityPage: { select: { id: true, city: true } },
      },
    });
    return NextResponse.json(people);
  } catch {
    return NextResponse.json({ error: "Failed to fetch people" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, role, photo, group, order, published, ministryId, cityPageId } = body;

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }

    const person = await db.person.create({
      data: {
        name,
        role,
        photo: photo ?? null,
        group: group || null,
        order: order ?? 0,
        published: published ?? false,
        ministryId: ministryId || null,
        cityPageId: cityPageId || null,
      },
    });
    return NextResponse.json(person, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create person";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
