import mongoose from "mongoose"
import { Message, Reaction } from "../types/message.js"

const reactionsSchema = new mongoose.Schema<Reaction>(
    {
        like: { type: Number, default: 0 },
        love: { type: Number, default: 0 },
        laugh: { type: Number, default: 0 },
    },
    { _id: false },
)

const messageSchema = new mongoose.Schema<Message>({
    conversationId: Number,
    userId: { type: Number, required: true },
    user: { type: String, required: true },
    avatar: { type: String, required: false },
    messageType: { type: String, enum: ["text", "image", "system"], default: "text" },
    message: String,
    reactions: { type: reactionsSchema, default: { like: 0, love: 0, laugh: 0 } },
    timestamp: Number,
})

export default mongoose.model("Message", messageSchema)
