import { usersRepository } from '../repositories/users-repository.js'
import { UserAccountDBType } from '../repositories/db-types.js' 
import { ObjectId } from 'mongodb'

export const usersService = {
    async getAllUsers(): Promise<UserAccountDBType[]> {
        return usersRepository.getAllUsers()
    },
    
    async findUserById(id: ObjectId): Promise<UserAccountDBType | null> {
        return usersRepository.findUserById(id)
    },
}