import DatabaseConnection from '../prismaConnection.js'

export class CategoryDAO {
  #prisma

  constructor () {
    this.#prisma = DatabaseConnection
  }

  async save (name) {
    await this.#prisma.category.create({ data: { name } })
  }

  async find () {
    const cateogries = await this.#prisma.category.findMany()
    return cateogries
  }

  async findById (ids) {
    if (typeof ids === 'number') ids = [ids]

    try {
      const categories = await this.#prisma.category.findMany({
        where: {
          id: {
            in: ids
          }
        }
      })
      return categories
    } catch (error) {
      throw new Error(`Erro ao buscar categoria: ${error.message}`)
    }
  }
}
