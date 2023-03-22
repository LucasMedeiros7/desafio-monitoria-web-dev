import request from 'supertest'
import Prisma from '../src/infra/prismaConnection.js'
import { app } from '../src/app.js'
import { generateToken } from '../src/utils/generateToken.js'
import { beforeEach, describe, expect, it } from 'vitest'

describe('GET /products', () => {
  beforeEach(async () => {
    await Prisma.category.deleteMany()
    await Prisma.product.deleteMany()
  })

  it('Deve retornar uma lista de produtos', async () => {
    await Prisma.product.create({
      data: {
        description: 'Novo produto de teste',
        retail_price: 150,
        wholesale_price: 150,
        categories: {
          create: {
            name: 'Categoria teste'
          }
        }
      }
    })
    const response = await request(app).get('/products')
    expect(response.status).toBe(200)

    const firstProduct = response.body[0]
    expect(firstProduct).toHaveProperty('id')
    expect(firstProduct).toHaveProperty('description')
    expect(firstProduct.categories[0]).toBe('Categoria teste')
  })

  it('Deve retornar uma lista um produto quando for passado o ID de parametro', async () => {
    const product = await Prisma.product.create({
      data: {
        description: 'Novo produto de teste2',
        retail_price: 150,
        wholesale_price: 150,
        categories: {
          create: {
            name: 'Categoria teste'
          }
        }
      }
    })
    const response = await request(app).get(`/products/${product.id}`)
    expect(response.status).toBe(200)

    expect(response.body.id).toBe(product.id)
    expect(response.body.description).toBe('Novo produto de teste2')
  })

  it('Deve retornar um erro quando for passado um Id inexistente', async () => {
    const response = await request(app).get(`/products/${150}`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Produto não existe' })
  })
})

describe('POST /products', () => {
  it('Usuário não autenticado não deve conseguir criar um produto', async () => {
    const payload = {
      description: 'Produto de Teste',
      retailPrice: 150,
      wholesalePrice: 150,
      categories: [1]
    }

    const response = await request(app).post('/products').send(payload)
    expect(response.body).toEqual({ message: 'Token não fornecido.' })
  })

  it('Deve ser possível criar um produto', async () => {
    const categoryID = await Prisma.category.create({ data: { name: 'Categoria teste 123' } })
    const payload = {
      description: 'Produto de Teste',
      retailPrice: 150,
      wholesalePrice: 150,
      categories: categoryID.id
    }
    const token = generateToken({ isAdmin: true })
    const response = await request(app).post('/products').set('Authorization', `Bearer ${token}`).send(payload)
    expect(response.body).toEqual({ message: 'Produto criado com sucesso' })
  })

  it('Não deve ser possível criar um produto faltando informação', async () => {
    const categoryID = await Prisma.category.create({ data: { name: 'Categoria teste 123' } })
    const payload = {
      description: 'Produto de Teste',
      retailPrice: 150,
      categories: [categoryID.id]
    }
    const token = generateToken({ isAdmin: true })
    const response = await request(app).post('/products').set('Authorization', `Bearer ${token}`).send(payload)
    expect(response.body).toEqual({ message: 'Preencha todos os campos corretamente' })
  })

  it('Não deve ser possível criar com uma categoria inexistente', async () => {
    const categoryIdNonExistent = 150
    const payload = {
      description: 'Produto de Teste',
      retailPrice: 150,
      wholesalePrice: 150,
      categories: [categoryIdNonExistent]
    }
    const token = generateToken({ isAdmin: true })
    const response = await request(app).post('/products').set('Authorization', `Bearer ${token}`).send(payload)
    expect(response.body).toEqual({ message: 'ID de categoria informado não existente' })
  })
})

describe('PUT /products/:id', () => {
  it('Deve ser possivel atualizar um produto', async () => {
    const payload = {
      description: 'Produto de Teste',
      retailPrice: 150,
      wholesalePrice: 150
    }

    const product = await Prisma.product.create({
      data: {
        description: payload.description,
        retail_price: payload.retailPrice,
        wholesale_price: payload.wholesalePrice,
        categories: {
          create: {
            name: 'Categoria teste'
          }
        }
      }
    })

    const token = generateToken({ isAdmin: true })
    const putResponse = await request(app).put(`/products/${product.id}`).set('Authorization', `Bearer ${token}`).send({
      ...payload,
      description: 'Descricao atualizada',
      retailPrice: 350
    })
    expect(putResponse.status).toBe(201)

    const getResponse = await request(app).get(`/products/${product.id}`)
    expect(getResponse.body.description).toEqual('Descricao atualizada')
    expect(getResponse.body.retail_price).toEqual(350)
  })
})

describe('DELETE /products/:id', () => {
  it('Deve ser possivel deletar um produto', async () => {
    const product = await Prisma.product.create({
      data: {
        description: 'Produto de Teste',
        retail_price: 150,
        wholesale_price: 250,
        categories: {
          create: {
            name: 'Categoria teste'
          }
        }
      }
    })

    const token = generateToken({ isAdmin: true })
    const deleteResponse = await request(app).delete(`/products/${product.id}`).set('Authorization', `Bearer ${token}`)
    expect(deleteResponse.status).toBe(201)
    expect(deleteResponse.body).toEqual({ message: 'Produto deletado com sucesso' })
  })
})
