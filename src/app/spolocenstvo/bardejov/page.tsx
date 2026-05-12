export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { CityPage } from "@/components/spolocenstvo/CityPage";

export const metadata = { title: "Bardejov | Marana Tha" };

export default async function BardejovPage() {
  const nextVCH = await db.event.findFirst({
    where: { isEveningOfPraise: true, published: true, location: "Bardejov", startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    select: { id: true, title: true, slug: true, startDate: true },
  });

  return (
    <CityPage
      city="Bardejov"
      heroImage="/images/bardejov-hero.jpg"
      description="Spoločenstvo Marana Tha v Bardejove je miestom stretnutí a spoločenstva pre tých, ktorí hľadajú živý vzťah s Bohom a s inými."
      meetingLabel="Večer chvál v BA"
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
