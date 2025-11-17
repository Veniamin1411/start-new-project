import { Router, Request, Response } from "express";
import { usersService } from '../domain/users-service.js'
import { usersInputValidationMiddleware } from "../middlewares/users-input-validation-middleware.js";

export const usersRouter = Router({})

usersRouter.get('/', async (req: Request, res: Response) => {
    const users = await usersService.getAllUsers()
    res.status(200).send(users)
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const user = await usersService.getUserById(req.params.id!)
    if (!user) return res.sendStatus(404)
    res.status(200).send(user)
})

usersRouter.put('/:id', usersInputValidationMiddleware, async (req: Request, res: Response) => {
    const result = await usersService.updateUser(req.params.id!, req.body)
    res.status(200).send(result)
})

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const result = await usersService.deleteUser(req.params.id!)
    if(!result) return res.sendStatus(404)
    res.sendStatus(204)
})