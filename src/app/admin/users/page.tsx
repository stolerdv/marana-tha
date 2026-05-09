import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/roles";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { CreateUserForm } from "@/components/admin/CreateUserForm";
import { DeleteUserButton } from "@/components/admin/DeleteUserButton";

const ROLE_LABELS: Record<string, string> = { ADMIN: "Administrátor", EDITOR: "Editor" };

export default async function AdminUsersPage() {
  const session = await auth();
  if (!isAdmin(session)) notFound();

  const users = await db.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  const currentUserId = (session?.user as { id?: string })?.id;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
          Používatelia
        </h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
          Správa prístupu do admin panela
        </p>
      </div>

      <div className="flex gap-8 items-start">

        {/* Users list */}
        <div className="flex-1">
          <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
            <div className="px-6 py-4 border-b border-[#e4d5b2]">
              <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e" }}>
                Aktívni používatelia ({users.length})
              </h2>
            </div>

            <div className="divide-y divide-[#e4d5b2]">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>
                        {user.name}
                      </p>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: user.role === "ADMIN" ? "#e4d5b2" : "#f3f4f6",
                          color: user.role === "ADMIN" ? "#866f36" : "#6b7280",
                          fontFamily: "var(--font-inter)",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        {ROLE_LABELS[user.role] ?? user.role}
                      </span>
                      {user.id === currentUserId && (
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "#9ca3af" }}>
                          (ty)
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginTop: "2px" }}>
                      {user.email}
                    </p>
                  </div>

                  {/* Can't delete yourself or other ADMIN */}
                  {user.id !== currentUserId && user.role !== "ADMIN" && (
                    <DeleteUserButton id={user.id} name={user.name} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create new editor */}
        <div className="shrink-0" style={{ width: "320px" }}>
          <div className="rounded-[15px] p-6" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
            <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e", marginBottom: "20px" }}>
              Pridať editora
            </h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginBottom: "16px", lineHeight: 1.5 }}>
              Editor môže upravovať obsah webu, ale nemôže spravovať používateľov.
            </p>
            <CreateUserForm />
          </div>
        </div>
      </div>
    </div>
  );
}
