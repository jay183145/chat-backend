import mongoose from "mongoose"
import { Message, Reactions } from "../types/message"

const reactionsSchema = new mongoose.Schema<Reactions>(
    {
        like: { type: Number, default: 0 },
        love: { type: Number, default: 0 },
        laugh: { type: Number, default: 0 },
    },
    { _id: false },
)

const messageSchema = new mongoose.Schema<Message>({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    userId: Number,
    user: String,
    avatar: String,
    messageType: { type: String, enum: ["text", "image", "system"], default: "text" },
    message: String,
    reactions: { type: reactionsSchema, default: { like: 0, love: 0, laugh: 0 } },
    timestamp: Number,
})

export default mongoose.model("Message", messageSchema)
