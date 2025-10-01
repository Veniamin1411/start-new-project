import { Router } from "express";
import { productsRepository } from "../repositories/products-repository.js";

export const productsRouter = Router({})

productsRouter.get('/', (req, res) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.get('/:id', (req, res) => {
    let foundProductById = productsRepository.findProductById(+req.params.id)

    if (foundProductById) {
        res.send(foundProductById)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.post('/', (req, res) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.sendStatus(201).send(newProduct)
})

productsRouter.put('/:id', (req, res) => {
    const isProductUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
        if (isProductUpdated) {
            const updatedProduct = productsRepository.findProductById(+req.params.id)
            res.send(updatedProduct)
        } else {
            res.sendStatus(404) 
        }
})

productsRouter.delete('/:id', (req, res) => {
    const isProductDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isProductDeleted) {
      res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})