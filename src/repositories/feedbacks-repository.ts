import { Types } from "mongoose";
import { FeedbacksModel } from "./db.js";
import { FeedbackDBType } from "./db-types.js";

export const feedbacksRepository = {
    async getAllFeedbacks(): Promise<FeedbackDBType[]> {
        return FeedbacksModel.find({}).lean()
    },

    async createFeedback(comment: string, userId: Types.ObjectId): Promise<FeedbackDBType> {
        const newFeedback: FeedbackDBType = {
            _id: new Types.ObjectId(),
            comment,
            userId,
            createdAt: new Date()
        } 
        await FeedbacksModel.insertOne(newFeedback)
        return newFeedback
    }
}