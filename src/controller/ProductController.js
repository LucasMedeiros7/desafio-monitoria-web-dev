import { validateRequest } from '../utils/validateProductRequest.js'

export class ProductController {
  #productDAO
  #categoryDAO

  constructor (productDAO, categoryDAO) {
    this.#productDAO = productDAO
    this.#categoryDAO = categoryDAO
  }

  async create (request, response) {
    console.log(request.body, validateRequest.safeParse(request.body).success)
    if (!validateRequest.safeParse(request.body).success) {
      return response.status(400).json({ message: 'Preencha todos os campos corretamente' })
    }

    const { description, retailPrice, wholesalePrice, categories } = request.body

    try {
      const categoriesExists = await this.#categoryDAO.findById(categories)
      if (!categoriesExists.length) {
        return response.status(400).json({ message: 'ID de categoria informado não existente' })
      }

      await this.#productDAO.create(
        {
          description,
          retailPrice: Number(retailPrice),
          wholesalePrice: Number(wholesalePrice)
        },
        categories
      )
      return response.status(201).json({ message: 'Produto criado com sucesso' })
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }

  async list (_request, response) {
    try {
      const products = await this.#productDAO.find()
      return response.json(products)
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }
}
