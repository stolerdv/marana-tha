import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const events = await db.event.findMany({
      orderBy: { startDate: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        startDate: true,
        endDate: true,
        location: true,
        published: true,
        isFeatured: true,
        isEveningOfPraise: true,
        coverImage: true,
        createdAt: true,
        _count: { select: { registrations: true } },
      },
    });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, description, content, coverImage, startDate, endDate, location, published, isFeatured, isEveningOfPraise, hasForm } = body;

    if (!title || !slug || !description || !startDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const event = await db.event.create({
      data: {
        title,
        slug,
        description,
        content: content ?? null,
        coverImage: coverImage ?? null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        location: location ?? null,
        published: published ?? false,
        isFeatured: isFeatured ?? false,
        isEveningOfPraise: isEveningOfPraise ?? false,
        hasForm: hasForm ?? false,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create event";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
