import mongoose from "mongoose"
import { ConversationDocument } from "../types/conversation.js"

const conversationSchema = new mongoose.Schema<ConversationDocument>({
    id: { type: Number, required: true, unique: true },
    participants: [
        {
            userId: { type: Number, required: true },
            user: { type: String, required: true },
            avatar: { type: String, required: false },
        },
    ],
    lastMessage: { type: String, default: "" },
    timestamp: Number,
})

export default mongoose.model("Conversation", conversationSchema)
