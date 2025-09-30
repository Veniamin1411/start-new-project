import { Router } from "express"

export const addresses = [{id: 1, value: 'Sadova 15'}, {id: 2, value: 'Tsentralna 150'}]

export const addressesRouter = Router({})

addressesRouter.get('/', (req, res) => {
  res.send(addresses)
})
addressesRouter.get('/:id', (req, res) => {
  let address = addresses.find(p => p.id === +req.params.id)

  if (address) {
    res.send(address)
  } else {
    res.sendStatus(404)
  }
})