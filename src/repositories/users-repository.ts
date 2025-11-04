import { UserDBType } from "./types.js"
import { usersCollection } from "./db.js"
import { ObjectId } from "mongodb"

export const usersRepository = {
    async getAllUsers(): Promise<UserDBType[]> {
        return usersCollection
        .find()
        .sort('createdAt', -1)
        .toArray()
    },

    async createUser(user: UserDBType): Promise<UserDBType> {
        const result = await usersCollection.insertOne(user)
        return user
    },

    async findUserById(id: ObjectId): Promise<UserDBType | null> {
        let user = await usersCollection.findOne({_id: id})
        if (user) {
            return user
        } else {
            return null
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne( { $or: [ { email: loginOrEmail }, { userName:loginOrEmail } ] } )
        return user
    }
}

export const repositoryDB = {}