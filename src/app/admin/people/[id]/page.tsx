import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { PersonForm } from "@/components/admin/PersonForm";
import Link from "next/link";

export default async function EditPersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [person, ministries, cityPages] = await Promise.all([
    db.person.findUnique({ where: { id } }),
    db.ministry.findMany({ select: { id: true, title: true }, orderBy: { order: "asc" } }),
    db.cityPage.findMany({ select: { id: true, city: true } }),
  ]);
  if (!person) notFound();

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/people" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>← Ľudia</Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>{person.name}</h1>
      </div>
      <PersonForm
        mode="edit"
        personId={person.id}
        ministries={ministries}
        cityPages={cityPages}
        initial={{
          name: person.name,
          role: person.role,
          photo: person.photo ?? "",
          order: person.order,
          published: person.published,
          ministryId: person.ministryId ?? "",
          cityPageId: person.cityPageId ?? "",
        }}
      />
    </div>
  );
}
