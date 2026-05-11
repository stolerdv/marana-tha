import "dotenv/config"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../src/generated/prisma/client.js"

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_URL! })
const prisma = new PrismaClient({ adapter })

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// 3 dates per city — roughly monthly, starting May 2026
const schedule: Record<string, Date[]> = {
  Prešov: [
    new Date("2026-05-23T19:00:00"),
    new Date("2026-06-20T19:00:00"),
    new Date("2026-07-18T19:00:00"),
  ],
  Košice: [
    new Date("2026-05-30T19:00:00"),
    new Date("2026-06-27T19:00:00"),
    new Date("2026-07-25T19:00:00"),
  ],
  Bardejov: [
    new Date("2026-05-24T18:00:00"),
    new Date("2026-06-21T18:00:00"),
    new Date("2026-07-19T18:00:00"),
  ],
}

async function main() {
  console.log("🌱 Seeding Večer chvál events...")

  for (const [city, dates] of Object.entries(schedule)) {
    for (const date of dates) {
      const month = date.toLocaleString("sk-SK", { month: "long" })
      const year = date.getFullYear()
      const title = `Večer chvál ${city} — ${month} ${year}`
      const slug = slugify(title)

      // Check if already exists
      const existing = await prisma.event.findUnique({ where: { slug } })
      if (existing) {
        console.log(`  ⏭ Preskočené (existuje): ${title}`)
        continue
      }

      await prisma.event.create({
        data: {
          title,
          slug,
          description: `Večer chvál v ${city === "Prešov" ? "Prešove" : city === "Košice" ? "Košiciach" : "Bardejove"} — čas spoločnej chvály, modlitby a prítomnosti Boha. Príď a prežívaj Boha s nami.`,
          startDate: date,
          location: city,
          published: true,
          isEveningOfPraise: true,
          isFeatured: false,
          hasForm: false,
        },
      })
      console.log(`  ✅ ${title}`)
    }
  }

  console.log("\n✅ Večer chvál events hotové!")
  console.log("💡 V admin paneli ich nájdeš v sekcii Akcie — môžeš kedykoľvek zmeniť dátum.")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
