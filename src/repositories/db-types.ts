import { WithId } from "mongodb"

export type ProductInMemoryType = {
    id: number
    title: string
}

export type ProductDBType = WithId<{
    id: number
    title: string
}>

export type UserAccountType = {
    id: number
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

export type FeedbackDBType = WithId<{
    id: number
    comment: string
    userId: number
    createdAt: Date
}>

export type RegistrationDataType = {
    ip: string
}