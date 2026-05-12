import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const partners = await db.partner.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
  return NextResponse.json(partners);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const partner = await db.partner.create({ data: { name: body.name, slug: body.slug, description: body.description, content: body.content || null, coverImage: body.coverImage || null, website: body.website || null, order: body.order ?? 0, published: body.published ?? true } });
  return NextResponse.json(partner, { status: 201 });
}
