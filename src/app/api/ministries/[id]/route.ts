import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function saveGallery(ministryId: string, slug: string, photos: string[]) {
  const existing = await db.gallery.findFirst({ where: { ministryId } });
  if (existing) {
    const oldPhotos = await db.photo.findMany({ where: { galleryId: existing.id }, select: { id: true } });
    for (const p of oldPhotos) await db.photo.delete({ where: { id: p.id } });
    for (let i = 0; i < photos.length; i++) {
      await db.photo.create({ data: { url: photos[i], galleryId: existing.id, order: i } });
    }
  } else if (photos.length > 0) {
    const gallery = await db.gallery.create({
      data: { title: "Galéria", slug: `gallery-ministry-${slug}-${Date.now()}`, published: true, ministryId },
    });
    for (let i = 0; i < photos.length; i++) {
      await db.photo.create({ data: { url: photos[i], galleryId: gallery.id, order: i } });
    }
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ministry = await db.ministry.findUnique({
      where: { id },
      include: { galleries: { include: { photos: { orderBy: { order: "asc" } } } } },
    });
    if (!ministry) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const photos = ministry.galleries[0]?.photos.map(p => p.url) ?? [];
    return NextResponse.json({ ...ministry, photos });
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
    const { title, slug, description, content, coverImage, photos, icon, order, published } = body;

    const ministry = await db.ministry.update({
      where: { id },
      data: { title, slug, description, content: content ?? null, coverImage: coverImage ?? null, icon: icon ?? null, order: order ?? 0, published },
    });

    if (photos !== undefined) await saveGallery(ministry.id, ministry.slug, photos ?? []);
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
