import mongoose from "mongoose"
import dotenv from "dotenv"
import Conversation from "../models/Conversation.js"
import { conversations } from "../data/defaultCoversations.js"

dotenv.config()

// 連接到 MongoDB 並插入 conversation 資料
async function seedConversations() {
    try {
        // 連線到 MongoDB
        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) {
            console.error("MONGO_URI is not set in the environment variables")
            process.exit(1)
        }
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected...")

        // 刪除舊的 Conversations 資料
        await Conversation.deleteMany({})
        console.log("舊的 Conversations 資料已刪除！")

        // 插入更新後的 conversations 資料
        await Conversation.insertMany(conversations)
        console.log("Conversations 資料插入成功！")
    } catch (error) {
        console.error("插入 Conversations 資料時發生錯誤：", error)
    } finally {
        // 關閉資料庫連線
        await mongoose.connection.close()
        console.log("資料庫連線已關閉")
    }
}

// 執行 seeding 程式
seedConversations()
