import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, name, email, data } = body;

    if (!eventId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify event exists and has form
    const event = await db.event.findUnique({
      where: { id: eventId, published: true, hasForm: true },
      select: { id: true },
    });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const registration = await db.registration.create({
      data: { eventId, name, email, data: data ?? {} },
    });
    return NextResponse.json(registration, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to register";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
