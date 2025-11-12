import { Router, Request, Response } from "express";
import { productsService } from "../domain/products-service.js"; 
import { ProductDBType } from "../repositories/db-types.js"; 

export const productsRouter = Router({})

productsRouter.get('/', async (req: Request, res: Response) => {
    const products = await productsService.getAllProducts()
    res.status(200).send(products)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product = await productsService.getProductById(req.params.id!)
    if (!product) return res.sendStatus(404)
    res.status(200).send(product)
})

productsRouter.post('/', async (req: Request, res: Response) => {
    const product = await productsService.createProduct(req.body.title)
    res.status(201).send(product)
})

productsRouter.put('/:id', async (req: Request, res: Response) => {
    const result = await productsService.updateProduct(req.params.id!, req.body.title)
    if (!result) return res.sendStatus(400)
    res.status(200).send(result)
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const result = await productsService.deleteProduct(req.params.id!)
    if (!result) return res.sendStatus(404)
    res.sendStatus(204)
})