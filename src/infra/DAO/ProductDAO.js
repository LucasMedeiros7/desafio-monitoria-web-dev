/* eslint-disable import/extensions */
import DatabaseConnection from '../db/prismaConnection.js';

export default class ProductDAO {
  #prisma;

  constructor() {
    this.#prisma = DatabaseConnection;
  }

  async create(data, categories) {
    const { description, retailPrice, wholesalePrice } = data;
    const connectCategories = categories.map((id) => ({
      id,
    }));
    await this.#prisma.product.create({
      data: {
        description,
        retail_price: retailPrice,
        wholesale_price: wholesalePrice,
        categories: {
          connect: connectCategories,
        },
      },
    });
  }

  async find() {
    return this.#prisma.product.findMany({
      include: {
        categories: true,
      },
    });
  }
}
