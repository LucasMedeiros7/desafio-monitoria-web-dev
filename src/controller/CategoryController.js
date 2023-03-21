export class CategoryController {
  constructor (categoryDAO) {
    this.categoryDAO = categoryDAO
  }

  async create (request, response) {
    const { name } = request.body
    const categoryAlreadyExists = await this.categoryDAO.findByName(name)

    if (categoryAlreadyExists) {
      return response.status(404).json({ message: 'Categoria já cadastrada' })
    }

    try {
      const category = await this.categoryDAO.save(name)
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
      const categories = await this.categoryDAO.find()
      return response.json(categories)
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }
}
