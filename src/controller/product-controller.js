// eslint-disable-next-line import/extensions
import validateRequest from '../utils/validate-request.js';

export default class ProductController {
  #productDAO;

  #categoryDAO;

  constructor(productDAO, categoryDAO) {
    this.#productDAO = productDAO;
    this.#categoryDAO = categoryDAO;
  }

  async create(request, response) {
    const { description, retailPrice, wholesalePrice } = request.body;
    let { categories } = request.body;

    if (typeof categories === 'number') categories = [categories];

    if (!validateRequest({ description, retailPrice, wholesalePrice }) || !categories.length) {
      return response.status(400).json({ message: 'Please fill all required fields' });
    }

    try {
      await this.#productDAO.create({
        description,
        retailPrice,
        wholesalePrice,
        categories,
      });
      return response.status(201).json({ message: 'Product created successfully' });
    } catch (err) {
      return response.status(500).json({ message: err.message });
    }
  }

  async list(request, response) {
    try {
      const products = await this.#productDAO.find();
      return response.json(products);
    } catch (err) {
      return response.status(500).json({ message: err.message });
    }
  }
}
