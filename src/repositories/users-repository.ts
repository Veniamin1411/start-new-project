import { UserAccountDBType } from "./db-types.js"
import { UsersModel } from "./db.js"
import { ObjectId } from "mongodb"

export const usersRepository = {
    async getAllUsers(): Promise<UserAccountDBType[]> {
        return await UsersModel.find({}).lean()
    },

    async getUserById(id: string): Promise<UserAccountDBType | null> {
        return await UsersModel.findById(id).lean()
    },

    async createUser(user: UserAccountDBType): Promise<UserAccountDBType> {
        return await UsersModel.create(user)
    },

    async updateUser(id: string, updateData: Partial<Omit<UserAccountDBType, "_id">>): Promise<UserAccountDBType | null> {
        return await UsersModel.findByIdAndUpdate(id, { $set: updateData }, { new: true })
    },

    async deleteUser(id: string): Promise<Boolean> {
        const result = await UsersModel.findByIdAndDelete(id)
        return result !== null   
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await UsersModel.findOne({ $or: [{'accountData.email': loginOrEmail}, {'accountData.userName': loginOrEmail}]}).lean()
        return user
    },

    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await UsersModel.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    },

    async updateConfirmation(id: ObjectId) {
        const result = await UsersModel.findByIdAndUpdate(id, {$set: {'emailConfirmation.isConfirmed': true}})
        return result !== null
    }
}

export const repositoryDB = {}