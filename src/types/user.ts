import { Document, Types } from "mongoose"

export interface UserDocument extends Document {
    username: string
    email: string
    avatar: string
    password: string
}

// 用於 JWT 的 payload
export interface UserPayload {
    userId: Types.ObjectId
    username: string
    email: string
    avatar: string
}
