import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword, name } = await req.json();
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // If changing password, verify current password first
  if (newPassword) {
    if (!currentPassword) return NextResponse.json({ error: "Zadaj aktuálne heslo" }, { status: 400 });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return NextResponse.json({ error: "Aktuálne heslo je nesprávne" }, { status: 400 });
    if (newPassword.length < 8) return NextResponse.json({ error: "Nové heslo musí mať aspoň 8 znakov" }, { status: 400 });
  }

  const data: { name?: string; password?: string } = {};
  if (name) data.name = name;
  if (newPassword) data.password = await bcrypt.hash(newPassword, 12);

  await db.user.update({ where: { id: userId }, data });
  return NextResponse.json({ ok: true });
}
