import { Document, Types } from "mongoose"

export interface UserDocument extends Document, UserData {}

export interface UserData {
    user: string
    email: string
    avatar: string
    password: string
}

export type User = {
    userId: number
    user: string
    avatar: string
}

// 用於 JWT 的 payload
export interface UserPayload {
    userId: Types.ObjectId
    user: string
    email: string
}
