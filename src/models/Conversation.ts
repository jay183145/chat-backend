import mongoose from "mongoose"
import { Conversation } from "../types/conversation.js"

const conversationSchema = new mongoose.Schema<Conversation>({
    id: { type: Number, required: true, unique: true },
    participants: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            username: String,
            avatar: String,
        },
    ],
    lastMessage: { type: String, default: "" },
    timestamp: Number,
})

export default mongoose.model("Conversation", conversationSchema)
