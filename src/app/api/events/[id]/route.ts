import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function saveGallery(eventId: string, eventSlug: string, photos: string[]) {
  const existing = await db.gallery.findFirst({ where: { eventId } });
  if (existing) {
    const oldPhotos = await db.photo.findMany({ where: { galleryId: existing.id }, select: { id: true } });
    for (const p of oldPhotos) {
      await db.photo.delete({ where: { id: p.id } });
    }
    for (let i = 0; i < photos.length; i++) {
      await db.photo.create({ data: { url: photos[i], galleryId: existing.id, order: i } });
    }
  } else if (photos.length > 0) {
    const gallery = await db.gallery.create({
      data: {
        title: "Galéria",
        slug: `gallery-${eventSlug}-${Date.now()}`,
        published: true,
        eventId,
      },
    });
    for (let i = 0; i < photos.length; i++) {
      await db.photo.create({ data: { url: photos[i], galleryId: gallery.id, order: i } });
    }
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const event = await db.event.findUnique({
      where: { id },
      include: {
        galleries: {
          include: { photos: { orderBy: { order: "asc" } } },
        },
      },
    });
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Flatten first gallery photos for the form
    const photos = event.galleries[0]?.photos.map(p => p.url) ?? [];
    return NextResponse.json({ ...event, photos });
  } catch {
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, slug, description, content, coverImage, photos, startDate, endDate, location, published, isFeatured, isEveningOfPraise, hasForm, formFields } = body;

    const event = await db.event.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        content: content ?? null,
        coverImage: coverImage ?? null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        location: location ?? null,
        published,
        isFeatured,
        isEveningOfPraise,
        hasForm,
        formFields: formFields ?? undefined,
      },
    });

    // Always sync gallery (even if empty — removes old photos)
    if (photos !== undefined) {
      await saveGallery(event.id, event.slug, photos ?? []);
    }

    return NextResponse.json(event);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update event";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await db.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
