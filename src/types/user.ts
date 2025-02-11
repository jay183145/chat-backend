import { Document, Types } from "mongoose"

export interface UserDocument extends Document {
    username: string
    email: string
    avatar: string
    password: string
}
