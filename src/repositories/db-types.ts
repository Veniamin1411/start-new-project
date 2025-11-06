import { ObjectId, WithId } from "mongodb"

export type ProductType = {
    id: number
    title: string
}

export type UserAccountType = {
    email: string
    userName: string
    passwordHash: string
    createdAt: Date
}

export type UserAccountDBType = WithId<{
    accountData: UserAccountType,
    emailConfirmation: EmailConfirmationType,
}>

export type EmailConfirmationType = {
    isConfirmed: boolean
    confirmationCode: string
    expirationDate: Date
    sentEmails: SentEmailType[]
}

export type SentEmailType = {
    sentDate: Date
}

export type FeedbackDBType = {
    _id: ObjectId
    comment: string
    userId: ObjectId
    createdAt: Date
}

export type RegistrationDataType = {
    ip: string
}