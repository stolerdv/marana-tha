import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { MinistryForm } from "@/components/admin/MinistryForm";
import Link from "next/link";

export default async function EditMinistryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ministry = await db.ministry.findUnique({ where: { id } });
  if (!ministry) notFound();

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/ministries" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>← Naša služba</Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>{ministry.title}</h1>
      </div>
      <MinistryForm
        mode="edit"
        ministryId={ministry.id}
        initial={{
          title: ministry.title,
          slug: ministry.slug,
          description: ministry.description,
          content: ministry.content ?? "",
          coverImage: ministry.coverImage ?? "",
          icon: ministry.icon ?? "",
          order: ministry.order,
          published: ministry.published,
        }}
      />
    </div>
  );
}
