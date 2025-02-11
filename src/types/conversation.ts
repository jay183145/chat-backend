import { UserDocument } from "./user"

export interface Conversation extends Document {
    participants: UserDocument[]
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
