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
 * POST /users
 * Body: { username, email, password }
 */
router.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body

        // 1. 基本檢查
        if (!username || !email || !password) {
            res.status(400).json({ code: 400, error: "Missing required fields" })
            return
        }

        // 2. 檢查 username 或 email 是否已存在
        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }],
        })
        if (existingUser) {
            res.status(409).json({ code: 409, error: "Username or email already taken" })
            return
        }

        // 雜湊(加鹽)
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // 3. 建立 User
        const newUser = new UserModel({ username, email, password: hashedPassword })
        await newUser.save()

        // 4. 回傳成功資訊
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        })
    } catch (err) {
        console.error("Error creating user:", err)
        res.status(500).json({ code: 500, error: "Failed to create user" })
    }
})

/**
 * 登入 (POST /login)
 * Body: { username, password }
 */
router.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body

        // 1. 檢查是否有傳 username 與 password
        if (!username || !password) {
            res.status(400).json({ code: 400, error: "Missing username or password" })
            return
        }

        // 2. 查詢是否有此使用者
        const user = await UserModel.findOne({ username })
        if (!user) {
            res.status(404).json({ code: 404, error: "User not found" })
            return
        }

        // 3. 驗證密碼 (compare 明文 vs 雜湊後)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({ code: 401, error: "Invalid credentials" })
            return
        }

        // 4. 產生 JWT (或是建立 session)
        //    secret 可放在 .env，例如 process.env.JWT_SECRET
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ code: 500, error: "JWT_SECRET is not set in the environment variables" })
            return
        }
        const userId = user._id as Types.ObjectId
        const token = jwt.sign(
            { userId: userId, username: user.username, email: user.email, avatar: user.avatar } satisfies UserPayload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" }, // token 有效期 (1 小時)
        )

        // 5. 把使用者資訊存入 cookie
        // 修改 cookie 設置方式
        if (process.env.NODE_ENV === "production") {
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict", // 改用 strict 增加安全性
                maxAge: 24 * 60 * 60 * 1000,
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
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        })
    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ code: 500, error: "Server error" })
        return
    }
})

export default router
