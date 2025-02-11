import { Types } from "mongoose"
import { UserDocument } from "./user"

export interface Conversation extends Document {
    id: number
    participants: {
        user: Types.ObjectId
        username: string
        avatar: string
    }[]
    lastMessage: string
    timestamp: number
}

export interface CreateMessagePayload {
    userId: number
    user: string
    avatar: string
    messageType: "text" | "image" | "system"
    message: string
    reactions?: {
        like?: number
        love?: number
        laugh?: number
    }
}
