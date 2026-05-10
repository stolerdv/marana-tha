import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const videos = await db.video.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(videos);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, youtubeUrl, published } = await req.json();
  if (!title || !youtubeUrl) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const video = await db.video.create({ data: { title, youtubeUrl, published: published ?? false } });
  return NextResponse.json(video, { status: 201 });
}
