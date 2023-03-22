import DatabaseConnection from '../prismaConnection.js'

export class CategoryDAO {
  #prisma

  constructor () {
    this.#prisma = DatabaseConnection
  }

  async save (name) {
    name = name.toLowerCase()
    await this.#prisma.category.create({ data: { name } })
  }

  async find () {
    const cateogries = await this.#prisma.category.findMany()
    return cateogries
  }

  async findByName (name) {
    name = name.toLowerCase()
    const cateogries = await this.#prisma.category.findFirst({
      where: { name }
    })
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

  async update (id, name) {
    const category = await this.#prisma.category.update({
      where: { id },
      data: { name }
    })
    return category
  }

  async delete (id) {
    await this.#prisma.category.delete({ where: { id } })
  }
}
