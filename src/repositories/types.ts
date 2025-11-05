import { ObjectId } from "mongodb"

export type ProductType = {
    id: number
    title: string
}

export type UserDBType = {
    _id: ObjectId
    userName: string
    email: string
    passwordHash: string
    passwordSalt: string
    createdAt: Date
}

export type FeedbackDBType = {
    _id: ObjectId
    comment: string
    userId: ObjectId
    createdAt: Date
}