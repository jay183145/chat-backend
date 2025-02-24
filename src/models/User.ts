import mongoose, { Schema } from "mongoose"
import { UserDocument } from "../types/user.js"

export const UserSchema = new Schema<UserDocument>(
    {
        userId: { type: Number, required: true, unique: true },
        user: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        avatar: { type: String, default: "" },
        password: { type: String, required: true },
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    { timestamps: true },
)

export default mongoose.model<UserDocument>("User", UserSchema)
