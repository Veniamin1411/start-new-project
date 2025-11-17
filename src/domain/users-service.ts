import { usersRepository } from '../repositories/users-repository.js'
import { UserAccountDBType } from '../repositories/db-types.js' 

export const usersService = {
    async getAllUsers(): Promise<UserAccountDBType[]> {
        return await usersRepository.getAllUsers()
    },
    
    async getUserById(id: string): Promise<UserAccountDBType | null> {
        return await usersRepository.getUserById(id)
    },

    async updateUser(id: string, updateData: Partial<Omit<UserAccountDBType, "_id">>): Promise<UserAccountDBType | null> {
        return await usersRepository.updateUser(id, updateData)
    },

    async deleteUser(id: string): Promise<Boolean> {
        return await usersRepository.deleteUser(id)
    }
}