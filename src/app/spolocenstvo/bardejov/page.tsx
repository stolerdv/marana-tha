import { CityPage } from "@/components/spolocenstvo/CityPage";

export const metadata = { title: "Bardejov | Marana Tha" };

export default function BardejovPage() {
  return (
    <CityPage
      city="Bardejov"
      heroImage="/images/bardejov-hero.jpg"
      description="Spoločenstvo Marana Tha v Bardejove je miestom stretnutí a spoločenstva pre tých, ktorí hľadajú živý vzťah s Bohom a s inými."
      meetingLabel="Večer chvál v BA"
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
