import { Router } from "express";
import { usersService } from '../domain/users-service.js'
import { authService } from "../domain/auth-service.js";
import { ObjectId } from "mongodb";

export const usersRouter = Router({})

usersRouter.post('/', async (req, res) => {
    const user = await authService.createUser(req.body.login, req.body.email, req.body.password)
    res.status(201).send(user)
})

usersRouter.get('/', async (req, res) => {
    const users = await usersService.getAllUsers()
    res.send(users)
})

usersRouter.put('/:id', async (req, res) => {
    const id = new ObjectId(req.params.id)
    const updateData = req.body

    const isUpdated = await usersService.updateUser(id, updateData)

    if (!isUpdated) {
        return res.status(404).send()
    } else {
        return res.status(204).send()
    }
})