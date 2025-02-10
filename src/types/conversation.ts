export interface Participant {
    userId: number
    user: string
    avatar: string
}

export interface Conversation extends Document {
    participants: Participant[]
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
