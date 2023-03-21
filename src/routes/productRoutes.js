import { Router } from 'express'
import { ProductController } from '../controller/ProductController.js'
import { CategoryDAO } from '../infra/DAO/CategoryDAO.js'
import { ProductDAO } from '../infra/DAO/ProductDAO.js'

const productRoutes = Router()

const productDAO = new ProductDAO()
const categoryDAO = new CategoryDAO()
const productController = new ProductController(productDAO, categoryDAO)

productRoutes.get('/', (request, response) => {
  productController.list(request, response)
})
productRoutes.post('/', (request, response) => {
  productController.create(request, response)
})

export { productRoutes }
