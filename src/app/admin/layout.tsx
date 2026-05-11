import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/roles";
import Link from "next/link";
import { signOut } from "@/lib/auth";

const editorNavItems = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/events", label: "Akcie", icon: "📅" },
  { href: "/admin/ministries", label: "Naša služba", icon: "🙏" },
  { href: "/admin/people", label: "Ľudia", icon: "👥" },
  { href: "/admin/registrations", label: "Registrácie", icon: "✓" },
  { href: "/admin/cities", label: "Mestá", icon: "📍" },
  { href: "/admin/posts", label: "Blog", icon: "📝" },
  { href: "/admin/media", label: "Médiá", icon: "🎬" },
  { href: "/admin/misie", label: "Misie", icon: "✈️" },
  { href: "/admin/pages", label: "Stránky", icon: "📄" },
];

const adminOnlyNavItems = [
  { href: "/admin/users", label: "Používatelia", icon: "🔑" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // No session → show children as-is (login page renders without sidebar)
  // The middleware already handles redirecting unauth users away from protected pages.
  if (!session) {
    return <>{children}</>;
  }

  const userIsAdmin = isAdmin(session);
  const navItems = userIsAdmin
    ? [...editorNavItems, ...adminOnlyNavItems]
    : editorNavItems;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f9efe2" }}>
      {/* Sidebar */}
      <aside className="flex flex-col shrink-0" style={{ width: "240px", backgroundColor: "#1c1d1e", minHeight: "100vh" }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div style={{ width: "32px", height: "32px", backgroundColor: "#bea055", borderRadius: "8px" }} />
          <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#fdf5f2" }}>
            Marana Tha
          </span>
        </div>

        {/* Role label */}
        <div className="px-6 pt-4 pb-2">
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 500, color: userIsAdmin ? "#bea055" : "#635f5b", letterSpacing: "1px", textTransform: "uppercase" }}>
            {userIsAdmin ? "Administrátor" : "Editor"}
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 flex-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] transition-colors hover:bg-white/10"
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 400, color: "#fdf5f2" }}>
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="px-6 py-4 border-t border-white/10">
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#fdf5f2", marginBottom: "2px" }}>
            {session.user?.name ?? session.user?.email}
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "#635f5b", marginBottom: "10px" }}>
            {session.user?.email}
          </p>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
            <button type="submit" className="w-full text-left transition-colors hover:text-[#bea055]"
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#9ca3af" }}>
              Odhlásiť sa →
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
