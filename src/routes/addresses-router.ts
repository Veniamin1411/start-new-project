import { Router } from "express"
import { addressesRepository } from "../repositories/addresses-repository.js"

export const addressesRouter = Router({})

addressesRouter.get('/', (req, res) => {
    addressesRepository.findAddresses()
})
addressesRouter.get('/:id', (req, res) => {
    let foundAddress = addressesRepository.findAddressById(+req.params.id)

    if (foundAddress) {
        res.send(foundAddress)
    } else {
        res.sendStatus(404)
    }
})