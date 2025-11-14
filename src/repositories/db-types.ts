import { WithId } from "mongodb"
import { Types } from "mongoose"

// Products

export type ProductInMemoryType = {
    id: number
    title: string
}

export type ProductDBType = WithId<{
    title: string
}>

// Users

export type UserAccountType = {
    email: string
    userName: string
    passwordHash: string
    createdAt: Date
}

export type EmailConfirmationType = {
    isConfirmed: boolean
    confirmationCode: string
    expirationDate: Date
    sentEmails: SentEmailType[]
}

export type SentEmailType = {
    sentDate: Date
}

export type UserAccountDBType = WithId<{
    accountData: UserAccountType
    emailConfirmation: EmailConfirmationType
}>

// Feedbacks

export type FeedbackDBType = WithId<{
    comment: string
    userId: Types.ObjectId
    createdAt: Date
}>

// Addresses

export type AddressDBType = WithId<{
    country: string
    region: string
    city: string
    street: string
    houseNumber: string
}>