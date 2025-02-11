import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import conversationRoutes from "./routes/conversationRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const app = express()

// 啟用 CORS 與 JSON 解析
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000", // 使用環境變數，如果未設定則使用預設值
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type"], // Allowed headers
        optionsSuccessStatus: 200, // 解決 OPTIONS 預檢請求的問題
    }),
)

// 掛載路由
app.use(express.json())
app.use("/conversations", conversationRoutes)
app.use("/messages", messageRoutes)
app.use("/", userRoutes)

// 連接到 MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error("MongoDB connection error:", err)
    }
}
connectDB()

// 啟動後端伺服器
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
