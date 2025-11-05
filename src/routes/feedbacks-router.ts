import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { feedbacksService } from "../domain/feedbacks-service.js";

export const feedbacksRouter = Router({})

feedbacksRouter.post('/', authMiddleware, async (req, res) => {
    const newFeedback = await feedbacksService.sendFeedback(req.body.comment, req.user!._id)
    res.status(201).send(newFeedback)
})

feedbacksRouter.get('/', async (req, res) => {
    const feedbacks = await feedbacksService.allFeedbacks()
    res.send(feedbacks)
})