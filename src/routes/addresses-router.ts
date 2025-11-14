import { Router, Request, Response } from "express"
import { addressesService } from "../domain/addresses-service.js"
import { addressesInputValidationMiddleware } from "../middlewares/addresses-input-validation-middleware.js"

export const addressesRouter = Router({})

addressesRouter.get('/', async (req: Request, res: Response) => {
    const addresses = await addressesService.getAllAddresses()
    res.status(200).send(addresses)
})

addressesRouter.get('/:id', async (req: Request, res: Response) => {
    const address = await addressesService.getAddressById(req.params.id!)
    if(!address) return res.sendStatus(404)
    res.status(200).send(address)
})

addressesRouter.post('/', addressesInputValidationMiddleware, async (req: Request, res: Response) => {
    const address = await addressesService.createAddress(req.body)
    res.status(201).send(address)
})

addressesRouter.put('/:id', addressesInputValidationMiddleware, async (req: Request, res: Response) => {
    const result = await addressesService.updateAddress(req.params.id!, req.body)
    res.status(200).send(result)
})

addressesRouter.delete('/:id', async (req: Request, res: Response) => {
    const result = await addressesService.deleteAddress(req.params.id!)
    if(!result) return res.sendStatus(404)
    res.sendStatus(204)
})