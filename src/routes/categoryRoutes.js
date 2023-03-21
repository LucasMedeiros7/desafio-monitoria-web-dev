import { Router } from 'express'
import { CategoryController } from '../controller/CategoryController.js'
import { CategoryDAO } from '../infra/DAO/CategoryDAO.js'

const categoryRoutes = Router()

const categoryDAO = new CategoryDAO()
const categoryController = new CategoryController(categoryDAO)

categoryRoutes.get('/', (request, response) => {
  categoryController.list(request, response)
})
categoryRoutes.post('/', (request, response) => {
  categoryController.create(request, response)
})

export { categoryRoutes }
