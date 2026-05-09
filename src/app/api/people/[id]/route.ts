import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { name, role, photo, order, published, ministryId, cityPageId } = body;

    const person = await db.person.update({
      where: { id },
      data: {
        name,
        role,
        photo: photo ?? null,
        order: order ?? 0,
        published,
        ministryId: ministryId || null,
        cityPageId: cityPageId || null,
      },
    });
    return NextResponse.json(person);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update person";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await db.person.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete person" }, { status: 500 });
  }
}
