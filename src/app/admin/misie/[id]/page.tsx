export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { MissionForm } from "@/components/admin/MissionForm";
import Link from "next/link";

export default async function EditMisiePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mission = await db.mission.findUnique({ where: { id } });
  if (!mission) notFound();

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/misie" style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055" }}>
          ← Misie
        </Link>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
          Upraviť misiu
        </h1>
      </div>
      <MissionForm
        mode="edit"
        missionId={mission.id}
        initial={{
          title: mission.title,
          slug: mission.slug,
          country: mission.country,
          description: mission.description,
          content: mission.content ?? "",
          coverImage: mission.coverImage ?? "",
          photos: (mission.photos as string[]) ?? [],
          order: mission.order,
          published: mission.published,
        }}
      />
    </div>
  );
}
