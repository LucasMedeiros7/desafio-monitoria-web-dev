/* eslint-disable import/extensions */
import { Router } from 'express';
import ProductController from '../controller/ProductController.js';
import ProductDAO from '../infra/DAO/ProductDAO.js';

const productRoutes = Router();

const productDAO = new ProductDAO();
const productController = new ProductController(productDAO);

productRoutes.get('/', (request, response) => {
  productController.list(request, response);
});

productRoutes.post('/', (request, response) => {
  productController.create(request, response);
});

// productRoutes.put('/', (request, response) => {

// });
// productRoutes.delete('/', (request, response) => {

// });

export default productRoutes;
