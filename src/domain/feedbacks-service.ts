import { ObjectId } from "mongodb"
import { FeedbackDBType } from "../repositories/db-types.js"
import { feedbacksRepository } from "../repositories/feedbacks-repository.js"

export const feedbacksService = {
    async allFeedbacks(): Promise<FeedbackDBType[]> {
        return feedbacksRepository.getAllFeedbacks()
    },

    async sendFeedback(comment: string, userId: ObjectId): Promise<FeedbackDBType> {
        return feedbacksRepository.createFeedback(comment, userId)
    }
}