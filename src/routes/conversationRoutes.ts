import { Router, Request, Response } from "express"
import Conversation from "../models/Conversation"
import Message from "../models/Message"
import { CreateMessagePayload } from "../types/conversation"

const router = Router()

/**
 * GET /conversations
 * 取得所有對話列表（依 timestamp 由新到舊排序）
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const conversations = await Conversation.find().sort({ timestamp: -1 })
        // 將 MongoDB 的 _id 改為 id 傳給前端
        const data = conversations.map((conv) => ({ id: conv._id, ...conv.toObject() }))
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * POST /conversations/:id/messages/create
 * 新增指定對話的訊息，並更新對話的 lastMessage 與 timestamp
 */
router.post("/:id/messages/create", async (req: Request, res: Response) => {
    const conversationId = req.params.id
    const payload: CreateMessagePayload = req.body
    try {
        // 新增訊息
        const newMessage = new Message({
            conversationId,
            ...payload,
            reactions: payload.reactions || { like: 0, love: 0, laugh: 0 },
            timestamp: Date.now(),
        })
        const savedMessage = await newMessage.save()

        // 更新對話的 lastMessage 與 timestamp
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: payload.message,
            timestamp: Date.now(),
        })

        // 取得掛載在 app 上的 Socket.IO 實例並廣播新訊息
        const io = req.app.get("io")
        io.emit("newMessage", savedMessage)

        res.status(201).json(savedMessage)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

export default router
