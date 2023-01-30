import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const category = await prisma.category.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: "teste 1"
        },
    })
    const book = await prisma.book.upsert({
        where: { id: 1 },
        update: {},
        create: {
        categoryId: 1,
        name: "teste",
        "password": "123456"
        },
    })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })