export class ProductController {
  #productDAO
  #categoryDAO

  constructor (productDAO, categoryDAO) {
    this.#productDAO = productDAO
    this.#categoryDAO = categoryDAO
  }

  async create (request, response) {
    const { description, retailPrice, wholesalePrice } = request.body
    const { categories } = request.body

    try {
      await this.#productDAO.create(
        {
          description,
          retailPrice: Number(retailPrice),
          wholesalePrice: Number(wholesalePrice)
        },
        categories
      )
      return response.status(201).json({ message: 'Product created successfully' })
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }

  async list (request, response) {
    try {
      const products = await this.#productDAO.find()
      return response.json(products)
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }
}
