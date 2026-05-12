export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { CityPage } from "@/components/spolocenstvo/CityPage";

export const metadata = { title: "Košice | Marana Tha" };

export default async function KosicePage() {
  const nextVCH = await db.event.findFirst({
    where: { isEveningOfPraise: true, published: true, location: "Košice", startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    select: { id: true, title: true, slug: true, startDate: true },
  });

  return (
    <CityPage
      city="Košice"
      heroImage="/images/kosice-hero.jpg"
      description="Spoločenstvo Marana Tha v Košiciach rastie a víta nových členov. Pridaj sa k nám a objav živú vieru v komunite priateľov."
      meetingLabel="Večer chvál v KE"
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
