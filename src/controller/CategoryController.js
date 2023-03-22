export class CategoryController {
  #categoryDAO

  constructor (categoryDAO) {
    this.#categoryDAO = categoryDAO
  }

  async create (request, response) {
    const { name } = request.body

    try {
      const categoryAlreadyExists = await this.#categoryDAO.findByName(name)
      if (categoryAlreadyExists) {
        return response.status(404).json({ message: 'Categoria já cadastrada' })
      }

      const category = await this.#categoryDAO.save(name)
      return response.status(201).json({
        message: 'Categoria criada com sucesso',
        category
      })
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }

  async list (_request, response) {
    try {
      const categories = await this.#categoryDAO.find()
      return response.json(categories)
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }

  async update (request, response) {
    const { id } = request.params
    const { name } = request.body

    try {
      const categoryExists = await this.#categoryDAO.findById(Number(id))

      if (!categoryExists.length) {
        return response.status(404).json({ message: 'Categoria não existe' })
      }

      const category = await this.#categoryDAO.update(Number(id), name)
      return response.status(201).json(category)
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }

  async delete (request, response) {
    const { id } = request.params

    try {
      const categoryExists = await this.#categoryDAO.findById(Number(id))
      if (!categoryExists.length) {
        return response.status(404).json({ message: 'Produto não existe' })
      }

      await this.#categoryDAO.delete(Number(id))
      return response.status(201).json({ message: 'Categoria deletada com sucesso' })
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }
}
