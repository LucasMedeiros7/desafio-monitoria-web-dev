import { validateRequest } from '../utils/validateProductRequest.js'

export class ProductController {
  #productDAO
  #categoryDAO

  constructor (productDAO, categoryDAO) {
    this.#productDAO = productDAO
    this.#categoryDAO = categoryDAO
  }

  async create (request, response) {
    if (!validateRequest.safeParse(request.body).success) {
      return response.status(400).json({ message: 'Preencha todos os campos corretamente' })
    }
    const { description, retailPrice, wholesalePrice } = request.body

    let { categories } = request.body
    if (typeof categories === 'number') categories = [categories]

    try {
      const categoriesExists = await this.#categoryDAO.findById(categories)
      if (!categoriesExists.length || categoriesExists.length !== categories.length) {
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

  async listById (request, response) {
    const { id } = request.params
    try {
      const product = await this.#productDAO.findById(Number(id))
      if (!product) {
        return response.status(404).json({ message: 'Produto não existe' })
      }
      return response.json(product)
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }

  async update (request, response) {
    request.body = { ...request.body, categories: [] }
    if (!validateRequest.safeParse(request.body).success) {
      return response.status(400).json({ message: 'Preencha todos os campos corretamente' })
    }
    const { id } = request.params
    const { description, retailPrice, wholesalePrice } = request.body

    try {
      const productExists = await this.#productDAO.findById(Number(id))

      if (!productExists) {
        return response.status(404).json({ message: 'Produto não existe' })
      }

      const product = await this.#productDAO.update(Number(id), {
        description,
        retailPrice,
        wholesalePrice
      })
      return response.status(201).json(product)
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }

  async delete (request, response) {
    const { id } = request.params

    try {
      const productExists = await this.#productDAO.findById(Number(id))
      if (!productExists) {
        return response.status(404).json({ message: 'Produto não existe' })
      }

      await this.#productDAO.delete(Number(id))
      return response.status(201).json({ message: 'Produto deletado com sucesso' })
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }
}
