import express from 'express'
import cors from 'cors'
import { categoryRoutes } from './routes/categoryRoutes.js'
import { productRoutes } from './routes/productRoutes.js'
import { generateToken } from './utils/generateToken.js'

import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/auth', (_request, response) => {
  const accessToken = generateToken({ isAdmin: true })
  return response.json({ accessToken })
})

app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)

export { app }
