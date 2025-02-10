import { Document, Types } from "mongoose"

export interface Reactions {
    like: number
    love: number
    laugh: number
}

export interface Message extends Document {
    conversationId: Types.ObjectId
    userId: number
    user: string
    avatar?: string
    messageType: "text" | "image" | "system"
    message: string
    reactions: Reactions
    timestamp: number
}
