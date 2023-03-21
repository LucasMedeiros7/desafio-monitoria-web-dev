import express from 'express'
import { categoryRoutes } from './routes/categoryRoutes.js'
import { productRoutes } from './routes/productRoutes.js'

const app = express()
app.use(express.json())

app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)

export { app }
