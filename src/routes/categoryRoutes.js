import { Router } from 'express'
import { CategoryController } from '../controller/CategoryController.js'
import { CategoryDAO } from '../infra/DAO/CategoryDAO.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const categoryRoutes = Router()

const categoryDAO = new CategoryDAO()
const categoryController = new CategoryController(categoryDAO)

categoryRoutes.get('/', (request, response) => {
  categoryController.list(request, response)
})
categoryRoutes.post('/', authMiddleware, (request, response) => {
  categoryController.create(request, response)
})
categoryRoutes.put('/', authMiddleware, (request, response) => {
  categoryController.update(request, response)
})
categoryRoutes.delete('/', authMiddleware, (request, response) => {
  categoryController.delete(request, response)
})

export { categoryRoutes }
