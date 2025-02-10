import mongoose from "mongoose"
import { Conversation, Participant } from "../types/conversation"

const participantSchema = new mongoose.Schema<Participant>({
    userId: Number,
    user: String,
    avatar: String,
})

const conversationSchema = new mongoose.Schema<Conversation>({
    participants: [participantSchema],
    lastMessage: String,
    timestamp: Number,
})

export default mongoose.model("Conversation", conversationSchema)
