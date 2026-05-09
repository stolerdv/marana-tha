import { db } from "@/lib/db";
import { PersonForm } from "@/components/admin/PersonForm";
import Link from "next/link";

export default async function NewPersonPage() {
  const [ministries, cityPages] = await Promise.all([
    db.ministry.findMany({ select: { id: true, title: true }, orderBy: { order: "asc" } }),
    db.cityPage.findMany({ select: { id: true, city: true } }),
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/people" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>← Ľudia</Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>Nová osoba</h1>
      </div>
      <PersonForm mode="create" ministries={ministries} cityPages={cityPages} />
    </div>
  );
}
