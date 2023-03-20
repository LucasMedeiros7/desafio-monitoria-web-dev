/* eslint-disable import/extensions */
import express from 'express';
import ProductController from './controller/product-controller.js';
import ApplicationModel from './DAO/application-model.js';

const app = express();
app.use(express.json());

const productDAO = new ApplicationModel('product');
const categoryDAO = new ApplicationModel('category');
const productController = new ProductController(productDAO, categoryDAO);

app.get('/products', productController.list);
app.post('/products', productController.create);

app.listen(3000);
