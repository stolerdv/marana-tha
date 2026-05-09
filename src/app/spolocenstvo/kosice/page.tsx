import { CityPage } from "@/components/spolocenstvo/CityPage";

export const metadata = { title: "Košice | Marana Tha" };

export default function KosicePage() {
  return (
    <CityPage
      city="Košice"
      heroImage="/images/kosice-hero.jpg"
      description="Spoločenstvo Marana Tha v Košiciach rastie a víta nových členov. Pridaj sa k nám a objav živú vieru v komunite priateľov."
      meetingLabel="Večer chvál v KE"
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
