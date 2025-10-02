import express from 'express'
import { productsRouter } from './routes/products-router.js'
import { addressesRouter } from './routes/addresses-router.js'

const app = express()
const port = 5000

app.use(express.json())
app.use('/addresses', addressesRouter)
app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})