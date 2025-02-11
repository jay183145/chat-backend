import { Document } from "mongoose"

export interface MessageDocument extends Document, Message {}

export interface Message {
    conversationId: number
    userId: number
    user: string
    avatar: string
    messageType: MessageType
    message: string
    reactions: Reaction
    timestamp: number
}

export type Reaction = {
    like: number
    love: number
    laugh: number
}

export type MessageType = "text" | "image" | "system"
