import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const ministries = await db.ministry.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        coverImage: true,
        icon: true,
        order: true,
        published: true,
        createdAt: true,
        _count: { select: { people: true } },
      },
    });
    return NextResponse.json(ministries);
  } catch {
    return NextResponse.json({ error: "Failed to fetch ministries" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, description, content, coverImage, icon, order, published } = body;

    if (!title || !slug || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ministry = await db.ministry.create({
      data: {
        title,
        slug,
        description,
        content: content ?? null,
        coverImage: coverImage ?? null,
        icon: icon ?? null,
        order: order ?? 0,
        published: published ?? false,
      },
    });
    return NextResponse.json(ministry, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create ministry";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
