import z from "zod"

export const userValidationSchema = z.object({
    accountData: z.object ({
        email: z.string(),
        userName: z.string(),
    })
})