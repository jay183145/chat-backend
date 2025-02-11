import mongoose from "mongoose"
import dotenv from "dotenv"
import Message from "../models/Message.js"
import { messages } from "../data/defaultMessages.js"

dotenv.config()

async function seedMessages() {
    try {
        // 連線到 MongoDB
        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) {
            console.error("MONGO_URI 尚未設定於環境變數中")
            process.exit(1)
        }
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB 連線成功！")

        // 刪除舊的 Message 資料
        await Message.deleteMany({})
        console.log("舊的 Message 資料已刪除！")

        // 插入轉換後的 Message 資料
        await Message.insertMany(messages)
        console.log("Message 資料插入成功！")
    } catch (error) {
        console.error("Message seeding 發生錯誤：", error)
    } finally {
        await mongoose.connection.close()
        console.log("資料庫連線已關閉")
    }
}

seedMessages()
