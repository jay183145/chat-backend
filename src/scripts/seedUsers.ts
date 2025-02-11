import mongoose from "mongoose"
import User from "../models/User.js"
import dotenv from "dotenv"
import { users } from "../data/defaultUsers.js"

dotenv.config()

async function seedUsers() {
    try {
        // 連線到 MongoDB
        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) {
            console.error("MONGO_URI is not set in the environment variables")
            process.exit(1)
        }
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected...")

        // // 刪除舊的 User 資料
        await User.deleteMany({})
        console.log("舊的 User 資料已刪除！")

        // Insert the users into the collection
        await User.insertMany(users)
        console.log("Users created successfully!")
    } catch (error) {
        console.error("Error creating users:", error)
    } finally {
        // Close the connection
        await mongoose.connection.close()
        console.log("Connection closed.")
    }
}

// Execute the seed function
seedUsers()
