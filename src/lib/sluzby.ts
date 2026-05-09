// Static service data — will be replaced by DB when admin panel is ready

export interface SluzbaEvent {
  type: string;   // "nácvik" | "udalosť" etc.
  date: string;
}

export interface SluzbaGalleryPhoto {
  src: string;
  alt: string;
}

export interface Sluzba {
  slug: string;
  title: string;
  titleShort: string;   // 2-line version for card: "Služba\nrodinám"
  description: string;
  image: string;        // card photo placeholder
  heroImage: string;
  contact: {
    name: string;
    phone: string;
    email: string;
    photo?: string;
  };
  events: SluzbaEvent[];
  gallery: SluzbaGalleryPhoto[];
}

export const sluzby: Sluzba[] = [
  {
    slug: "rodinam",
    title: "Služba rodinám",
    titleShort: "Služba\nrodinám",
    description: "Služba pre manželské páry a rodiny, ktoré chcú budovať silné rodinné spoločenstvo v kresťanskom duchu.",
    image: "/images/sluzba-rodinam.jpg",
    heroImage: "/images/sluzby-hero.jpg",
    contact: { name: "Meno Priezvisko", phone: "0901 234 567", email: "meno@maranathapo.sk" },
    events: [
      { type: "nácvik", date: "6.5. 2026" },
      { type: "nácvik", date: "13.5. 2026" },
      { type: "udalosť", date: "20.5. 2026" },
      { type: "udalosť", date: "27.5. 2026" },
    ],
    gallery: [],
  },
  {
    slug: "mladym",
    title: "Služba mladým",
    titleShort: "Služba\nmladým",
    description: "Miesto pre mládež, kde môžeš rásť vo viere, nájsť priateľov a objaviť svoje dary v komunite.",
    image: "/images/sluzba-mladym.jpg",
    heroImage: "/images/sluzby-hero.jpg",
    contact: { name: "Meno Priezvisko", phone: "0901 234 567", email: "meno@maranathapo.sk" },
    events: [
      { type: "nácvik", date: "6.5. 2026" },
      { type: "udalosť", date: "13.5. 2026" },
    ],
    gallery: [],
  },
  {
    slug: "modlitby",
    title: "Služba modlitby",
    titleShort: "Služba\nmodlitby",
    description: "Spoločná modlitba, adorácia a duchovné sprevádzanie pre všetkých, ktorí chcú prehlbovať vzťah s Bohom.",
    image: "/images/sluzba-modlitby.jpg",
    heroImage: "/images/sluzby-hero.jpg",
    contact: { name: "Meno Priezvisko", phone: "0901 234 567", email: "meno@maranathapo.sk" },
    events: [
      { type: "nácvik", date: "6.5. 2026" },
      { type: "udalosť", date: "13.5. 2026" },
    ],
    gallery: [],
  },
  {
    slug: "muzom",
    title: "Služba mužom",
    titleShort: "Služba\nmužom",
    description: "Stretnutia pre mužov — miesto rastu, bratstva a formácie v duchu kresťanského mužstva.",
    image: "/images/sluzba-muzom.jpg",
    heroImage: "/images/sluzby-hero.jpg",
    contact: { name: "Meno Priezvisko", phone: "0901 234 567", email: "meno@maranathapo.sk" },
    events: [
      { type: "nácvik", date: "6.5. 2026" },
      { type: "udalosť", date: "13.5. 2026" },
    ],
    gallery: [],
  },
  {
    slug: "zenam",
    title: "Služba ženám",
    titleShort: "Služba\nženám",
    description: "Stretnutia pre ženy — miesto prijatia, rastu a sesterstva v kresťanskom spoločenstve.",
    image: "/images/sluzba-zenam.jpg",
    heroImage: "/images/sluzby-hero.jpg",
    contact: { name: "Meno Priezvisko", phone: "0901 234 567", email: "meno@maranathapo.sk" },
    events: [
      { type: "nácvik", date: "6.5. 2026" },
      { type: "udalosť", date: "13.5. 2026" },
    ],
    gallery: [],
  },
  {
    slug: "ostatne",
    title: "Ostatné služby",
    titleShort: "Služba\nostatné ...",
    description: "Ďalšie aktivity a služby spoločenstva Marana Tha — pre každého, kto hľadá miesto, kde môže prispieť.",
    image: "/images/sluzba-ostatne.jpg",
    heroImage: "/images/sluzby-hero.jpg",
    contact: { name: "Meno Priezvisko", phone: "0901 234 567", email: "meno@maranathapo.sk" },
    events: [
      { type: "udalosť", date: "6.5. 2026" },
      { type: "udalosť", date: "13.5. 2026" },
    ],
    gallery: [],
  },
];

export function getSluzba(slug: string): Sluzba | undefined {
  return sluzby.find(s => s.slug === slug);
}
