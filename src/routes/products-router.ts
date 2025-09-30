import { Router } from "express";

export const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRouter = Router({})

productsRouter.get('/', (req, res) => {
  if (req.query.title) {
    let searchString = req.query.title.toString()
    res.send(products.filter(p => p.title.indexOf(searchString) > -1))
  } else {
    res.send(products)
  }
})

productsRouter.get('/:id', (req, res) => {
  let product = products.find(p => p.id === +req.params.id)

  if (product) {
    res.send(product)
  } else {
    res.sendStatus(404)
  }
})

productsRouter.post('/', (req, res) => {
  const newProduct = {
    id: +(new Date()),
    title: req.body.title
  }
  products.push(newProduct)

  res.status(201).send(newProduct)
})

productsRouter.put('/:id', (req, res) => {
  let product = products.find(p => p.id === +req.params.id)

  if (product) {
    product.title = req.body.title
    res.send(product)
  } else {
    res.send(404)
  }
})

productsRouter.delete('/:id', (req, res) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]?.id === +req.params.id) {
      products.splice(i, 1)
      res.sendStatus(204)
      return
    }
  }
})