import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const mission = await db.mission.findUnique({ where: { id } });
    if (!mission) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(mission);
  } catch {
    return NextResponse.json({ error: "Failed to fetch mission" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const mission = await db.mission.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        country: body.country,
        description: body.description,
        content: body.content || null,
        coverImage: body.coverImage || null,
        photos: body.photos || [],
        order: body.order ?? 0,
        published: body.published ?? false,
      },
    });
    return NextResponse.json(mission);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update mission";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await db.mission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete mission" }, { status: 500 });
  }
}
