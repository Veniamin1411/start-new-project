import { UserAccountDBType } from "./db-types.js"
import { UsersModel } from "./db.js"
import { ObjectId } from "mongodb"

export const usersRepository = {
    async getAllUsers(): Promise<UserAccountDBType[]> {
        const users = await UsersModel.find({}).lean()
        return users
    },

    async createUser(user: UserAccountDBType): Promise<UserAccountDBType> {
        await UsersModel.insertOne(user)
        return user
    },

    async findUserById(id: ObjectId): Promise<UserAccountDBType | null> {
        const user = await UsersModel.findOne({_id: id}).lean<UserAccountDBType>()
        if (user) {
            return user
        } else {
            return null
        }
    },

    async updateUser(id: ObjectId, updateData: Partial<UserAccountDBType>): Promise<boolean> {
        const result = await UsersModel.updateOne({_id: id}, {$set: updateData})
        return result.modifiedCount === 1
    },

    async deleteUser(id: ObjectId): Promise<boolean> {
        const result = await UsersModel.deleteOne({_id: id})
        return result.deletedCount === 1
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await UsersModel.findOne({ $or: [{'accountData.email': loginOrEmail}, {'accountData.userName': loginOrEmail}]})
        return user
    },

    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await UsersModel.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    },

    async updateConfirmation(id: ObjectId) {
        let result = await UsersModel.updateOne({id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    }
}

export const repositoryDB = {}