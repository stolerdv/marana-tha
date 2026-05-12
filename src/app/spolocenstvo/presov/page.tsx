export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { CityPage } from "@/components/spolocenstvo/CityPage";

export const metadata = { title: "Prešov | Marana Tha" };

export default async function PresovPage() {
  const nextVCH = await db.event.findFirst({
    where: { isEveningOfPraise: true, published: true, location: "Prešov", startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    select: { id: true, title: true, slug: true, startDate: true },
  });

  return (
    <CityPage
      city="Prešov"
      heroImage="/images/presov-hero.jpg"
      description="Spoločenstvo Marana Tha v Prešove sa pravidelne stretáva na chválach, modlitbách a formácii. Sme miestom, kde môžeš prežívať živú vieru v komunite priateľov."
      meetingLabel="Večer chvál v PO"
      nextVCH={nextVCH ?? undefined}
      team={[
        { name: "Meno Priezvisko" },
        { name: "Meno Priezvisko" },
        { name: "Meno Priezvisko" },
        { name: "Meno Priezvisko" },
        { name: "Meno Priezvisko" },
      ]}
    />
  );
}
