// routes/users.ts
import { Router, Request, Response } from "express"
import UserModel from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserPayload } from "../types/user.js"
import { Types } from "mongoose"

const router = Router()

/**
 * 建立新的 User (註冊)
 * POST /
 * Body: { user, email, password }
 */
router.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, email, password } = req.body

        // 1. 基本檢查
        if (!user || !email || !password) {
            res.status(400).json({ code: 400, error: "Missing required fields" })
            return
        }

        // 2. 檢查 username 或 email 是否已存在
        const existingUser = await UserModel.findOne({
            $or: [{ user }, { email }],
        })
        if (existingUser) {
            res.status(409).json({ code: 409, error: "Username or email already taken" })
            return
        }

        // 雜湊(加鹽)
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // 3. 建立 User
        const newUser = new UserModel({ user, email, password: hashedPassword })
        await newUser.save()

        // 4. 回傳成功資訊
        res.status(201).json({
            id: newUser._id,
            user: newUser.user,
            email: newUser.email,
        })
    } catch (err) {
        console.error("Error creating user:", err)
        res.status(500).json({ code: 500, error: "Failed to create user" })
    }
})

/**
 * 登入 (POST /login)
 * Body: { user, password }
 */
router.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { password, email } = req.body

        // 1. 檢查是否有傳 user 與 password
        if (!password || !email) {
            res.status(400).json({ code: 400, error: "Missing password or email" })
            return
        }

        // 2. 查詢是否有此使用者
        const userData = await UserModel.findOne({ email })
        if (!userData) {
            res.status(404).json({ code: 404, error: "User not found" })
            return
        }

        // 3. 驗證密碼 (compare 明文 vs 雜湊後)
        const isMatch = await bcrypt.compare(password, userData.password)
        if (!isMatch) {
            res.status(401).json({ code: 401, error: "Invalid credentials" })
            return
        }

        // 4. 產生 JWT (或是建立 session)
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ code: 500, error: "JWT_SECRET is not set in the environment variables" })
            return
        }
        const userId = userData._id as Types.ObjectId
        const token = jwt.sign(
            { userId: userId, user: userData.user, email: userData.email } satisfies UserPayload,
            process.env.JWT_SECRET,
            { expiresIn: "3h" }, // token 有效期 (3 小時)
        )

        // 5. 把使用者資訊存入 cookie
        // 修改 cookie 設置方式
        if (process.env.NODE_ENV === "production") {
            res.cookie("token", token, {
                httpOnly: true, // 防止 JS 存取
                secure: true, // 只允許 HTTPS 存取
                sameSite: "strict", // 防止跨站攻擊
                maxAge: 24 * 60 * 60 * 1000, // 一天
            })
        } else {
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            })
        }

        // 6. 回傳 token 或使用者資訊
        res.json({
            message: "Login successful",
            token,
            user: {
                id: userData._id,
                user: userData.user,
                email: userData.email,
            },
        })
    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ code: 500, error: "Server error" })
        return
    }
})

export default router
