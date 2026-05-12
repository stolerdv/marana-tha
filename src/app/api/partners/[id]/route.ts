import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const partner = await db.partner.update({ where: { id }, data: { name: body.name, slug: body.slug, description: body.description, content: body.content || null, coverImage: body.coverImage || null, website: body.website || null, order: body.order ?? 0, published: body.published ?? true } });
  return NextResponse.json(partner);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.partner.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
