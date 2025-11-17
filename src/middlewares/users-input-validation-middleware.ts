import { Request, Response, NextFunction }  from "express"
import { userValidationSchema } from "../validations/user-schema.js"

export const usersInputValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const validated = userValidationSchema.safeParse(req.body)

    if(!validated.success) {
        return res.status(400).json(validated.error.format())
    }

    req.body = validated.data

    next()
}