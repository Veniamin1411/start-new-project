import { usersRepository } from '../repositories/users-repository.js'
import { UserDBType } from '../repositories/types.js' 
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

export const usersService = {
    async createUser(login: string, email: string, password: string): Promise<UserDBType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserDBType = {
            _id: new ObjectId(),
            userName: login,
            email, passwordHash, passwordSalt,
            createdAt: new Date()
        }

        return usersRepository.createUser(newUser)
    },

    async findUserById(id: ObjectId): Promise<UserDBType | null> {
        return usersRepository.findUserById(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserDBType | null> {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return null
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return null
        }

        return user
    },

    async _generateHash(password: string, salt: string): Promise<string> {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
}