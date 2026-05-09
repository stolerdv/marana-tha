import { auth } from "@/lib/auth";

// Check if current session is ADMIN
export async function requireAdmin() {
  const session = await auth();
  if (!session) return null;
  const role = (session.user as { role?: string })?.role;
  return role === "ADMIN" ? session : null;
}

// Check if current session is at least EDITOR (any logged-in user)
export async function requireEditor() {
  const session = await auth();
  return session ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}
