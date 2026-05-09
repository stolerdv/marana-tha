import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/roles";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  // Cannot delete yourself
  const currentUserId = (session.user as { id?: string })?.id;
  if (id === currentUserId) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  try {
    await db.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const currentUserId = (session.user as { id?: string })?.id;

  // Only ADMIN can change other users' passwords, or user can change their own
  const body = await req.json();
  const { name, password } = body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {};
    if (name) data.name = name;
    if (password) {
      const bcrypt = await import("bcryptjs");
      data.password = await bcrypt.hash(password, 12);
    }

    const user = await db.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true },
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
