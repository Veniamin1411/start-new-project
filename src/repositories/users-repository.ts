import { UserAccountDBType } from "./db-types.js"
import { usersCollection } from "./db.js"
import { ObjectId } from "mongodb"

export const usersRepository = {
    async getAllUsers(): Promise<UserAccountDBType[]> {
        return usersCollection
        .find()
        .sort('createdAt', -1)
        .toArray()
    },

    async createUser(user: UserAccountDBType): Promise<UserAccountDBType> {
        const result = await usersCollection.insertOne(user)
        return user
    },

    async findUserById(id: ObjectId): Promise<UserAccountDBType | null> {
        let user = await usersCollection.findOne({_id: ObjectId})
        if (user) {
            return user
        } else {
            return null
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({ $or: [{'accountData.email': loginOrEmail}, {'accountData.userName': loginOrEmail}]})
        return user
    },

    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await usersCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    },

    async updateConfirmation(_id: ObjectId) {
        let result = await usersCollection.updateOne({_id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    }
}

export const repositoryDB = {}