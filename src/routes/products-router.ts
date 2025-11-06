import { Router } from "express";
import { productsService } from "../domain/products-service.js"; 
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware.js";
import { body } from "express-validator";
import { ProductType } from "../repositories/db-types.js"; 

export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 30}).withMessage('Title length should be form 3 to 10 symbols')

productsRouter.get('/', async (req, res) => {
    const foundProducts: ProductType[] = await productsService.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.get('/:id', async (req, res) => {
    let foundProductById: ProductType | null = await productsService.findProductById(+req.params.id)

    if (foundProductById) {
        res.send(foundProductById)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.post('/', titleValidation, inputValidationMiddleware, async (req, res) => {
    debugger
    const newProduct: ProductType = await productsService.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id', titleValidation, inputValidationMiddleware, async (req, res) => {
    const isProductUpdated = await productsService.updateProduct(+req.params.id!, req.body.title)
        
    if (isProductUpdated) {
        const updatedProduct = productsService.findProductById(+req.params.id!)
        res.send(updatedProduct)
    } else {
        res.sendStatus(404) 
    }
})

productsRouter.delete('/:id', async (req, res) => {
    const isProductDeleted = await productsService.deleteProduct(+req.params.id)
    if (isProductDeleted) {
      res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})