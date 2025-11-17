import { Request, Response, NextFunction } from "express";
import { addressValidationSchema } from "../validations/address-schema.js";

export const addressesInputValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const validated = addressValidationSchema.safeParse(req.body)

    if(!validated.success) {
        return res.status(400).json(validated.error.format())
    }

    req.body = validated.data

    next()
}