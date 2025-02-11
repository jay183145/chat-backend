import mongoose from "mongoose"
import { Conversation } from "../types/conversation"
import { UserSchema } from "./User"

const conversationSchema = new mongoose.Schema<Conversation>({
    participants: { type: [UserSchema], default: [] },
    lastMessage: { type: String, default: "" },
    timestamp: Number,
})

export default mongoose.model("Conversation", conversationSchema)
