import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app.js'
import Prisma from '../src/infra/prismaConnection.js'
import { generateToken } from '../src/utils/generateToken.js'

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
    console.log(firstProduct)
    expect(firstProduct).toHaveProperty('id')
    expect(firstProduct).toHaveProperty('description')
    expect(firstProduct.categories[0]).toBe('Categoria teste')
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
      categories: [categoryID.id]
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
