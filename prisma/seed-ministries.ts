import "dotenv/config"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../src/generated/prisma/client.js"

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_URL! })
const prisma = new PrismaClient({ adapter })

const ministries = [
  {
    slug: "detska",
    title: "Detská služba",
    description: "Služba pre deti, kde rastú vo viere, hre a spoločenstve. Každé dieťa je vítané a milované.",
    content: "<p>Detská služba spoločenstva Marana Tha je miesto, kde deti objavujú Božiu lásku primeraným a radostným spôsobom. Cez hry, piesne a príbehy sprevádzame tie najmenšie deti na ich duchovnej ceste.</p>",
    coverImage: "/images/sluzba-ostatne.jpg",
    order: 1,
  },
  {
    slug: "hudobna",
    title: "Hudobná služba",
    description: "Tím muzikantov a spevákov, ktorí vedú spoločenstvo v chválach a uctievaní Boha.",
    content: "<p>Hudobná služba tvorí srdce každého večera chvál. Náš tím muzikantov a spevákov sa pravidelne stretáva na nácvikoch a spoločne slúži na všetkých stretnutiach spoločenstva.</p>",
    coverImage: "/images/vecer-chval-hero.jpg",
    order: 2,
  },
  {
    slug: "modlitbova",
    title: "Modlitbová služba",
    description: "Spoločná modlitba, adorácia a duchovné sprevádzanie pre všetkých, ktorí chcú prehlbovať vzťah s Bohom.",
    content: "<p>Modlitbová služba je základom celého spoločenstva. Pravidelné modlitebné stretnutia, adorácie a modlitby za uzdravenie sú piliermi nášho duchovného života.</p>",
    coverImage: "/images/sluzba-modlitby.jpg",
    order: 3,
  },
  {
    slug: "pastierska",
    title: "Pastierska služba",
    description: "Duchovné sprevádzanie, pastorácia a starostlivosť o členov spoločenstva.",
    content: "<p>Pastierska služba sa stará o duchovné zdravie celého spoločenstva. Naši pastierskí pracovníci sprevádzajú ľudí v ich osobnom raste, rodinnom živote a v ťažkých chvíľach.</p>",
    coverImage: "/images/o-nas-1.jpg",
    order: 4,
  },
  {
    slug: "produkcna",
    title: "Produkčná služba",
    description: "Tím, ktorý zabezpečuje zvuk, svetlá, záznamy a technickú stránku každého podujatia.",
    content: "<p>Produkčná služba pracuje v zákulisí každej udalosti — zabezpečuje zvuk, osvietenie, livestream a záznamy. Bez nich by žiadne podujatie nemohlo fungovať.</p>",
    coverImage: "/images/o-nas-2.jpg",
    order: 5,
  },
  {
    slug: "kurzy",
    title: "Služba kurzov",
    description: "Formačné kurzy a vzdelávanie pre tých, ktorí chcú rásť vo viere a poznávaní Boha.",
    content: "<p>Organizujeme rôzne formačné kurzy — od základov viery pre nových členov až po hlbšie biblické a teologické štúdie. Každý kurz je príležitosťou na rast a spoločenstvo.</p>",
    coverImage: "/images/sluzby-hero.jpg",
    order: 6,
  },
  {
    slug: "misie",
    title: "Služba misií",
    description: "Misijné výjazdy a evanjelizačné aktivity doma aj v zahraničí. Nesi dobrú správu ďalej.",
    content: "<p>Misijná služba organizuje evanjelizačné akcie, misijné výjazdy a modlitby za národy. Veríme, že každý kresťan je poslaný — a my ti pomôžeme nájsť tvoje miesto v tomto poslaní.</p>",
    coverImage: "/images/misie.jpg",
    order: 7,
  },
  {
    slug: "mladym",
    title: "Služba mladým",
    description: "Miesto pre mládež, kde môžeš rásť vo viere, nájsť priateľov a objaviť svoje dary.",
    content: "<p>Služba mladým je živým srdcom spoločenstva. Piatkové stretnutia, konferencie a letné tábory — to všetko je miestom kde mladí ľudia nachádzajú Boha, priateľov a svoje povolanie.</p>",
    coverImage: "/images/sluzba-mladym.jpg",
    order: 8,
  },
  {
    slug: "tanecna",
    title: "Tanečná služba",
    description: "Tanec ako forma uctievania Boha — krása pohybu v službe Pánovi.",
    content: "<p>Tanečná služba vyjadruje chválu a uctievanie cez pohyb a tanec. Naši tanečníci slúžia na špeciálnych podujatiach a konferenciách, prináša radosť a krásu do uctievania.</p>",
    coverImage: "/images/sluzba-rodinam.jpg",
    order: 9,
  },
]

async function main() {
  console.log("🌱 Seeding ministries...")

  for (const m of ministries) {
    await prisma.ministry.upsert({
      where: { slug: m.slug },
      update: {
        title: m.title,
        description: m.description,
        content: m.content,
        coverImage: m.coverImage,
        order: m.order,
        published: true,
      },
      create: {
        ...m,
        published: true,
      },
    })
    console.log(`  ✅ ${m.title}`)
  }

  console.log("\n✅ Všetkých 9 služieb pridaných!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
