import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, published: true, coverImage: true, createdAt: true },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, slug, content, excerpt, coverImage, published } = await req.json();
    if (!title || !slug || !content) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    const post = await db.post.create({ data: { title, slug, content, excerpt: excerpt ?? null, coverImage: coverImage ?? null, published: published ?? false } });
    return NextResponse.json(post, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 });
  }
}
