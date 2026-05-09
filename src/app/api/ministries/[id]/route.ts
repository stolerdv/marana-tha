import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ministry = await db.ministry.findUnique({ where: { id } });
    if (!ministry) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(ministry);
  } catch {
    return NextResponse.json({ error: "Failed to fetch ministry" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, slug, description, content, coverImage, icon, order, published } = body;

    const ministry = await db.ministry.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        content: content ?? null,
        coverImage: coverImage ?? null,
        icon: icon ?? null,
        order: order ?? 0,
        published,
      },
    });
    return NextResponse.json(ministry);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update ministry";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await db.ministry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete ministry" }, { status: 500 });
  }
}
