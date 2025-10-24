import express from 'express'
import { productsRouter } from './routes/products-router.js'
import { addressesRouter } from './routes/addresses-router.js'
import bodyParser from 'body-parser'
import { runDb } from './repositories/db.js'

const app = express()
const port = process.env.PORT || 5000

const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

app.use(express.json())
app.use('/addresses', addressesRouter)
app.use('/products', productsRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()