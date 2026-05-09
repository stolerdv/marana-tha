"use client";

import { PageHero } from "@/components/shared/PageHero";

// O nás frame is at y=202 → titleTop=528 (730-202=528)
export function ONasHero() {
  return (
    <PageHero
      title="O nás"
      description="Spoločenstvo Marana Tha je katolícke spoločenstvo detí, mládeže a dospelých, ktorí chcú prežívať živé kresťanstvo a deliť sa s inými so živou vierou. Je miestom stretnutí, modlitieb, chvál, formácie a evanjelizácie."
      image="/images/o-nas-hero.jpg"
      titleTop={528}
    />
  );
}
