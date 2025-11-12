import mongoose, { Types, Schema } from "mongoose"
import { EmailConfirmationType, FeedbackDBType, ProductDBType, SentEmailType, UserAccountDBType, UserAccountType } from "./db-types.js"

// Products

export const productSchema = new mongoose.Schema<ProductDBType>({
    title: String
})

// Users

export const userAccountSchema = new mongoose.Schema<UserAccountType>({
    email: String,
    userName: String,
    passwordHash: String,
    createdAt: Date
}, { _id: false })

export const sentEmailSchema = new mongoose.Schema<SentEmailType>({
    sentDate: Date
}, { _id: false })

export const emailConfirmationSchema = new mongoose.Schema<EmailConfirmationType>({
    isConfirmed: Boolean,
    confirmationCode: String,
    expirationDate: Date,
    sentEmails: { type: [sentEmailSchema], default: [] }
}, { _id: false })

export const userSchema = new mongoose.Schema<UserAccountDBType>({
    accountData: userAccountSchema,
    emailConfirmation: emailConfirmationSchema
})

// Feedbacks

export const feedbackSchema = new mongoose.Schema<FeedbackDBType>({
    comment: String,
    userId: { type: Schema.Types.ObjectId },
    createdAt: Date
})