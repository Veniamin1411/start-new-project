import { Request, Response, Router } from "express";
import { usersService } from '../domain/users-service.js'
import { authService } from "../domain/auth-service.js";

export const usersRouter = Router({})

usersRouter.post('/', async (req: Request, res: Response) => {
    const user = await authService.createUser(req.body.login, req.body.email, req.body.password)
    res.status(201).send(user)
})

usersRouter.get('/', async (req, res) => {
    const result = await usersService.getAllUsers()
    res.send(result)
})