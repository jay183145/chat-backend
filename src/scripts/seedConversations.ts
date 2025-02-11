import mongoose from "mongoose"
import dotenv from "dotenv"
import Conversation from "../models/Conversation"
import User from "../models/User"

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

        // 先從 User 集合中撈出所有使用者資料，建立 username 對應 user 的 mapping
        const users = await User.find({})
        const userMap = {}
        users.forEach((user) => {
            // 假設 username 為唯一鍵
            userMap[user.username] = user
        })

        // 根據 username 將 conversations 中的 participants 更新為正確的 user 資料
        const updatedConversations = conversations.map((conv) => {
            const updatedParticipants = conv.participants
                .map((participant) => {
                    const user = userMap[participant.username]
                    if (!user) {
                        console.warn(`User with username "${participant.username}" not found in database.`)
                        // 若找不到則保留原資料或視情況處理
                        return null
                    }

                    return {
                        user: user._id, // 儲存使用者參考
                        username: user.username,
                        avatar: user.avatar, // 這邊取自 user 資料，確保 avatar 是正確的
                    }
                })
                .filter((p) => p !== null) // 過濾掉找不到 user 的項目

            return {
                id: conv.id,
                participants: updatedParticipants,
                lastMessage: conv.lastMessage,
                timestamp: conv.timestamp,
            }
        })

        // 插入更新後的 conversations 資料
        await Conversation.insertMany(updatedConversations)
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

const conversations = [
    {
        id: 1,
        participants: [
            { username: "David", avatar: "https://i.pravatar.cc/150?img=4" },
            { username: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
        ],
        lastMessage: "I'm building a new side project.",
        timestamp: 1739016600000,
    },
    {
        id: 2,
        participants: [
            { username: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { username: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        lastMessage: "What's your favorite editor?",
        timestamp: 1739017200000,
    },
    {
        id: 3,
        participants: [
            { username: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
            { username: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        lastMessage: "Let's meet up sometime!",
        timestamp: 1739017800000,
    },
    {
        id: 4,
        participants: [
            { username: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { username: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
        ],
        lastMessage: "Redux or Zustand?",
        timestamp: 1739018400000,
    },
    {
        id: 5,
        participants: [
            { username: "Emma", avatar: "https://i.pravatar.cc/150?img=5" },
            { username: "David", avatar: "https://i.pravatar.cc/150?img=4" },
        ],
        lastMessage: "How do you test your frontend?",
        timestamp: 1739019000000,
    },
    {
        id: 6,
        participants: [
            { username: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { username: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
        ],
        lastMessage: "End-to-end testing is crucial.",
        timestamp: 1739019600000,
    },
    {
        id: 7,
        participants: [
            { username: "Emma", avatar: "https://i.pravatar.cc/150?img=5" },
            { username: "David", avatar: "https://i.pravatar.cc/150?img=4" },
        ],
        lastMessage: "How do you test your frontend?",
        timestamp: 1739020200000,
    },
    {
        id: 8,
        participants: [
            { username: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { username: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        lastMessage: "Nice to meet you!",
        timestamp: 1739020800000,
    },
    {
        id: 9,
        participants: [
            { username: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { username: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        lastMessage: "How's it going?",
        timestamp: 1739021400000,
    },
    {
        id: 10,
        participants: [
            { username: "Emma", avatar: "https://i.pravatar.cc/150?img=5" },
            { username: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
        ],
        lastMessage: "I'm building a new side project.",
        timestamp: 1739022000000,
    },
]
