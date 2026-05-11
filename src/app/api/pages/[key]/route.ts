import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const page = await db.pageContent.findUnique({ where: { key } });
  return NextResponse.json(page ?? null);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const body = await req.json();
  const { title, subtitle, content, coverImage, data } = body;

  const page = await db.pageContent.upsert({
    where: { key },
    create: { key, title, subtitle, content, coverImage, data },
    update: { title, subtitle, content, coverImage, data },
  });

  return NextResponse.json(page);
}
