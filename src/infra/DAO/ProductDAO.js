import DatabaseConnection from '../prismaConnection.js'

export class ProductDAO {
  #prisma

  constructor () {
    this.#prisma = DatabaseConnection
  }

  async create (data, categories) {
    const { description, retailPrice, wholesalePrice } = data
    const connectCategories = categories.map(id => ({ id }))

    await this.#prisma.product.create({
      data: {
        description,
        retail_price: retailPrice,
        wholesale_price: wholesalePrice,
        categories: {
          connect: connectCategories
        }
      }
    })
  }

  async find () {
    const products = await this.#prisma.product.findMany({
      include: {
        categories: true
      }
    })
    return products.map(product => {
      return {
        ...product,
        categories: product.categories.map(category => category.name)
      }
    })
  }

  async findById (id) {
    const product = await this.#prisma.product.findFirst({
      where: {
        id
      }
    })
    return product
  }
}
