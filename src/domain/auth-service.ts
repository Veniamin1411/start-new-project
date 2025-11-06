import { ObjectId } from "mongodb"
import { v4 as uuidv4 } from 'uuid'
import { add } from 'date-fns/add'
import { usersRepository } from "../repositories/users-repository.js"
import { UserAccountDBType } from "../repositories/db-types.js"
import bcrypt from 'bcrypt'

export const authService = {
    async createUser (login: string, email: string, password: string): Promise<UserAccountDBType | null> {
        const passwordHash = await this._generateHash(password)
        const user: UserAccountDBType = {
            _id: new ObjectId(),
            accountData: {
                userName: login,
                email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false,
                sentEmails: []
            }
        }
        const createResult = await usersRepository.createUser(user)
        // try {
        //     await emailsManager.sendEmailConfirmationMessage(user)
        // } catch(error) {
        //     console.error(error)
        //     await usersRepository.deleteUser(user._id)
        //     return null
        // }
        return createResult
    },

    async confirmEmail(code: string): Promise<boolean> {
        let user = await usersRepository.findUserByConfirmationCode(code)
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false
        
        const result = await usersRepository.updateConfirmation(user._id)
        return result
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserAccountDBType | null> {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return null

        if (!user.emailConfirmation.isConfirmed) return null

        const isHashesEquals = await this._isPasswordCorrect(password, user.accountData.passwordHash)
        if (isHashesEquals) {
            return user
        } else {
            return null
        }
    },

    async _generateHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

    async _isPasswordCorrect(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}