// backend/routes/messageRoutes.ts
import { Router, Request, Response } from "express"
import Message from "../models/Message.js"

const router = Router()

/**
 * GET /messages?conversationId={id}
 * 取得指定對話的所有訊息（依 timestamp 由舊到新排序）
 */
router.get("/", async (req: Request, res: Response): Promise<void> => {
    const conversationId = req.query.conversationId
    if (!conversationId) {
        res.status(400).json({ error: "請提供 conversationId 查詢參數" })
    }
    try {
        const messages = await Message.find({ conversationId }).sort({ timestamp: 1 })
        res.json(messages)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
