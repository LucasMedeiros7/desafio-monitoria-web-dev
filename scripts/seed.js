import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  const categoriesAlreadyExists = await prisma.category.findMany()
  if (categoriesAlreadyExists.length) {
    console.log('Seed already been run!')
    return
  }
  const categories = [
    { name: 'categoria 1' },
    { name: 'categoria 2' },
    { name: 'categoria 3' },
    { name: 'categoria 4' },
    { name: 'categoria 5' }
  ]
  for (const category of categories) {
    await prisma.category.create({ data: { ...category } })
  }
  console.log('Seeds have been successfully created! 🌱')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
