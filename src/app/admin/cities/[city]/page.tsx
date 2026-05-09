import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { CityForm } from "@/components/admin/CityForm";
import Link from "next/link";

const CITY_LABELS: Record<string, string> = { presov: "Prešov", bardejov: "Bardejov", kosice: "Košice" };
const CITY_ENUM: Record<string, "PRESOV" | "BARDEJOV" | "KOSICE"> = {
  presov: "PRESOV", bardejov: "BARDEJOV", kosice: "KOSICE",
};

export default async function EditCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityKey = CITY_ENUM[city.toLowerCase()];
  if (!cityKey) notFound();

  const cityPage = await db.cityPage.findUnique({ where: { city: cityKey } });
  if (!cityPage) notFound();

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/cities" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>← Mestá</Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>
          {CITY_LABELS[city.toLowerCase()]}
        </h1>
      </div>
      <CityForm citySlug={city.toLowerCase()} initial={{
        title: cityPage.title,
        content: cityPage.content ?? "",
        coverImage: cityPage.coverImage ?? "",
        address: cityPage.address ?? "",
        mapUrl: cityPage.mapUrl ?? "",
        contactEmail: cityPage.contactEmail ?? "",
        contactPhone: cityPage.contactPhone ?? "",
      }} />
    </div>
  );
}
