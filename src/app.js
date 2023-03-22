import express from 'express'
import { categoryRoutes } from './routes/categoryRoutes.js'
import { productRoutes } from './routes/productRoutes.js'
import { generateToken } from './utils/generateToken.js'

const app = express()
app.use(express.json())

app.get('/auth', (_request, response) => {
  const accessToken = generateToken({ isAdmin: true })
  return response.json({ accessToken })
})

app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)

export { app }
