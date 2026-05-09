import { CityPage } from "@/components/spolocenstvo/CityPage";

export const metadata = { title: "Prešov | Marana Tha" };

export default function PresovPage() {
  return (
    <CityPage
      city="Prešov"
      heroImage="/images/presov-hero.jpg"
      description="Spoločenstvo Marana Tha v Prešove sa pravidelne stretáva na chválach, modlitbách a formácii. Sme miestom, kde môžeš prežívať živú vieru v komunite priateľov."
      meetingLabel="Večer chvál v PO"
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
