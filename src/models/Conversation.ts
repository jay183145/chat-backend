import mongoose from "mongoose"
import { Conversation } from "../types/conversation"

const conversationSchema = new mongoose.Schema<Conversation>({
    id: { type: Number, required: true, unique: true },
    participants: [
        {
            username: { type: String, ref: "User", required: true },
            avatar: { type: String, required: false },
        },
    ],
    lastMessage: { type: String, default: "" },
    timestamp: Number,
})

export default mongoose.model("Conversation", conversationSchema)
