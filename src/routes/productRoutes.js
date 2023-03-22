import { Router } from 'express'
import { ProductDAO } from '../infra/DAO/ProductDAO.js'
import { CategoryDAO } from '../infra/DAO/CategoryDAO.js'
import { ProductController } from '../controller/ProductController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const productRoutes = Router()

const productDAO = new ProductDAO()
const categoryDAO = new CategoryDAO()
const productController = new ProductController(productDAO, categoryDAO)

productRoutes.get('/', (request, response) => {
  productController.list(request, response)
})
productRoutes.get('/:id', (request, response) => {
  productController.listById(request, response)
})
productRoutes.post('/', authMiddleware, (request, response) => {
  productController.create(request, response)
})

export { productRoutes }
