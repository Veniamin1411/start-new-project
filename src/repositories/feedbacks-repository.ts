import { ObjectId } from "mongodb";
import { feedbacksCollection } from "./db.js";
import { FeedbackDBType } from "./types.js";

export const feedbacksRepository = {
    async getAllFeedbacks(): Promise<FeedbackDBType[]> {
        return feedbacksCollection.find().toArray()
    },

    async createFeedback(comment: string, userId: ObjectId): Promise<FeedbackDBType> {
        const newFeedback: FeedbackDBType = {
            _id: new ObjectId(),
            comment,
            userId,
            createdAt: new Date()
        } 
        await feedbacksCollection.insertOne(newFeedback)
        return newFeedback
    }
}