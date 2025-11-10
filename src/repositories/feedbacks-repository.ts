import { ObjectId } from "mongodb";
import { FeedbacksModel } from "./db.js";
import { FeedbackDBType } from "./db-types.js";

export const feedbacksRepository = {
    async getAllFeedbacks(): Promise<FeedbackDBType[]> {
        return FeedbacksModel.find({}).lean()
    },

    async createFeedback(comment: string, userId: number): Promise<FeedbackDBType> {
        const newFeedback: FeedbackDBType = {
            _id: new ObjectId,
            id: +(new Date()),
            comment,
            userId,
            createdAt: new Date()
        } 
        await FeedbacksModel.insertOne(newFeedback)
        return newFeedback
    }
}