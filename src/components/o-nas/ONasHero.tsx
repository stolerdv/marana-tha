"use client";

import { PageHero } from "@/components/shared/PageHero";

interface Props { title?: string; description?: string; image?: string; }

export function ONasHero({ title, description, image }: Props) {
  return (
    <PageHero
      title={title ?? "O nás"}
      description={description ?? "Spoločenstvo Marana Tha je katolícke spoločenstvo detí, mládeže a dospelých, ktorí chcú prežívať živé kresťanstvo a deliť sa s inými so živou vierou. Je miestom stretnutí, modlitieb, chvál, formácie a evanjelizácie."}
      image={image ?? "/images/o-nas-hero.jpg"}
      titleTop={528}
    />
  );
}
