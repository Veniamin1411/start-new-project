import { UserAccountDBType } from "../repositories/db-types.js";
import jwt from 'jsonwebtoken'
import { settings } from "../settings.js";

export const jwtService = {
    async createJWT(user: UserAccountDBType) {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '1h'})
        return token
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    }
}