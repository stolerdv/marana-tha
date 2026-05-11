import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const missions = await db.mission.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        country: true,
        description: true,
        coverImage: true,
        order: true,
        published: true,
        createdAt: true,
      },
    });
    return NextResponse.json(missions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch missions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const mission = await db.mission.create({
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
    return NextResponse.json(mission, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create mission";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
