import mongoose from "mongoose"
import { EmailConfirmationType, FeedbackDBType, ProductDBType, SentEmailType, UserAccountDBType, UserAccountType } from "./db-types.js"

export const userAccountSchema = new mongoose.Schema<UserAccountType>({
    id: Number,
    email: String,
    userName: String,
    passwordHash: String,
    createdAt: Date
})

export const sentEmailSchema = new mongoose.Schema<SentEmailType>({
    sentDate: Date
})

export const emailConfirmationSchema = new mongoose.Schema<EmailConfirmationType>({
    isConfirmed: Boolean,
    confirmationCode: String,
    expirationDate: Date,
    sentEmails: sentEmailSchema
})

export const userSchema = new mongoose.Schema<UserAccountDBType>({
    accountData: userAccountSchema,
    emailConfirmation: emailConfirmationSchema
})

/////////////////////////////////

export const productSchema = new mongoose.Schema<ProductDBType>({
    id: Number,
    title: String
})

/////////////////////////////////

export const feedbackSchema = new mongoose.Schema<FeedbackDBType>({
    id: Number,
    comment: String,
    userId: Number,
    createdAt: Date
})