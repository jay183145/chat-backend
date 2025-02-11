import { User } from "./user.js"

export interface ConversationDocument extends Document, Conversation {}
export interface Conversation {
    id: number
    participants: User[]
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
