import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const galleries = await db.gallery.findMany({
    where: { eventId: null, ministryId: null },
    orderBy: { createdAt: "desc" },
    include: { photos: { orderBy: { order: "asc" }, take: 1 } },
  });
  return NextResponse.json(galleries);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, slug, coverImage, published, photos } = await req.json();
  if (!title || !slug) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const gallery = await db.gallery.create({
    data: { title, slug, coverImage: coverImage || null, published: published ?? true },
  });

  if (photos && Array.isArray(photos)) {
    for (let i = 0; i < photos.length; i++) {
      await db.photo.create({ data: { url: photos[i], order: i, galleryId: gallery.id } });
    }
  }

  return NextResponse.json(gallery, { status: 201 });
}
