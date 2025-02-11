import mongoose, { Schema } from "mongoose"
import { UserDocument } from "../types/user"

export const UserSchema = new Schema<UserDocument>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        avatar: { type: String, default: "" },
        password: { type: String, required: true },
    },
    { timestamps: true },
)

export default mongoose.model<UserDocument>("User", UserSchema)
