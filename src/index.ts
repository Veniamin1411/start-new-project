import express from 'express'
<<<<<<< HEAD
import { productsRouter } from './routes/products-router.js'
import { addressesRouter } from './routes/addresses-router.js'
const app = express()
const port = 5000

app.use('/addresses', addressesRouter)
app.use('/products', productsRouter)
=======
import { title } from 'process'
const app = express()
const port = 3000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'Sadova 15'}, {id: 2, value: 'Tsentralna 150'}]

app.get('/products', (req, res) => {
  if (req.query.title) {
    let searchString = req.query.title.toString()
    res.send(products.filter(p => p.title.indexOf(searchString) > -1))
  } else {
    res.send(products)
  }
})
app.get('/products/:id', (req, res) => {
  let product = products.find(p => p.id === +req.params.id)

  if (product) {
    res.send(product)
  } else {
    res.sendStatus(404)
  }
})

app.delete('/products/:id', (req, res) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1)
      res.sendStatus(204)
      return
    }
  }

  res.sendStatus(404)
})

app.post('/products', (req, res) => {
  const newProduct = {
    id: +(new Date()),
    title: req.body.title
  }
  products.push(newProduct)

  res.status(201).send(newProduct)
})

app.get('/addresses', (req, res) => {
  res.send(addresses)
})
app.get('/addresses/:id', (req, res) => {
  let address = addresses.find(p => p.id === +req.params.id)

  if (address) {
    res.send(address)
  } else {
    res.sendStatus(404)
  }
})

>>>>>>> 90296310ee8080aa17caa807e1c52fabe3680ce4

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})