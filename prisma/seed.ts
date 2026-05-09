import "dotenv/config"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../src/generated/prisma/client.js"
import bcrypt from "bcryptjs"

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await bcrypt.hash("admin123", 12)

  await prisma.user.upsert({
    where: { email: "admin@maranatha.sk" },
    update: {},
    create: {
      email: "admin@maranatha.sk",
      password,
      name: "Administrator",
      role: "ADMIN",
    },
  })

  // Создаём страницы городов
  for (const city of ["PRESOV", "BARDEJOV", "KOSICE"] as const) {
    await prisma.cityPage.upsert({
      where: { city },
      update: {},
      create: {
        city,
        title:
          city === "PRESOV"
            ? "Spoločenstvo v Prešove"
            : city === "BARDEJOV"
              ? "Spoločenstvo v Bardejove"
              : "Spoločenstvo v Košiciach",
        content: "<p>Obsah stránky bude doplnený.</p>",
      },
    })
  }

  console.log("✅ Seed hotový")
  console.log(`👤 Admin: admin@maranatha.sk / admin123`)
  console.log("⚠️  Zmeňte heslo po prvom prihlásení!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
