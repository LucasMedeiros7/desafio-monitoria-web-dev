/* eslint-disable import/extensions */
import DatabaseConnection from '../infra/prisma-connection.js';

export default class ApplicationModel {
  #table;

  #prisma;

  constructor(tableName) {
    this.#table = tableName;
    this.#prisma = DatabaseConnection;
  }

  async create(data) {
    if (!data.categories) {
      await this.prisma[this.#table].create({ data });
      return;
    }
    const {
      description, retailPrice, wholesalePrice, categories,
    } = data;

    await this.prisma[this.#table].create({
      data: {
        description,
        retailPrice,
        wholesalePrice,
        categories: {
          create: {
            id: categories,
          },
        },
      },
    });
  }

  async find() {
    if (this.#table === 'category') {
      return this.prisma[this.#table].findMany();
    }
    return this.prisma[this.#table].findMany({
      include: {
        categories: true,
      },
    });
  }
}
