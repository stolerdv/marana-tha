export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { PartnerForm } from "@/components/admin/PartnerForm";
import Link from "next/link";

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await db.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/partnerstva" style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055" }}>← Partnerstvá</Link>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>Upraviť partnerstvo</h1>
      </div>
      <PartnerForm mode="edit" partnerId={partner.id} initial={{ name: partner.name, slug: partner.slug, description: partner.description, content: partner.content ?? "", coverImage: partner.coverImage ?? "", website: partner.website ?? "", order: partner.order, published: partner.published }} />
    </div>
  );
}
