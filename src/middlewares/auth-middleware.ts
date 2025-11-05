import { Request, Response, NextFunction } from "express";
import { jwtService } from "../application/jwt-service.js";
import { usersRepository } from "../repositories/users-repository.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.sendStatus(401)
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.sendStatus(401)
    }

    const userId = await jwtService.getUserIdByToken(token)
    if (!userId) {
        return res.sendStatus(401)
    }

    const user = await usersRepository.findUserById(userId)
    if (!user) {
        return res.sendStatus(401)
    }

    req.user = user

    return next()
}
