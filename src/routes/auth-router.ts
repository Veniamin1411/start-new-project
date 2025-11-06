import { Request, Response, Router } from "express";
import { jwtService } from "../application/jwt-service.js";
import { authService } from "../domain/auth-service.js";

export const authRouter = Router({})

authRouter.post('/registration', async (req, res) => {
    const user = await authService.createUser(req.body.login, req.body.email, req.body.password)
    if (user) {
        res.sendStatus(201)
    } else {
        res.sendStatus(400)
    }
})

authRouter.post('/login', async (req: Request, res: Response) => {
    const user = await authService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (user) {
        const token = await jwtService.createJWT(user)
        res.status(201).send(token)
    } else {
        res.sendStatus(401)
    }
})

authRouter.post('/confirm-email', async (req, res) => {
    const result = await authService.confirmEmail(req.body.code)
    if (result) {
        res.sendStatus(201)
    } else {
        res.sendStatus(400)
    }
})

authRouter.post('/resend-registration-code', async (req, res) => {
    const result = await authService.confirmEmail(req.body.email)
    if (result) {
        res.sendStatus(201)
    } else {
        res.sendStatus(400)
    }
})