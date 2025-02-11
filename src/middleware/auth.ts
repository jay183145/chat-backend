import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { UserPayload } from "../types/user.js"

/**
 * 讓 Request 搭配 user 屬性
 */
export interface AuthRequest extends Request {
    user?: UserPayload
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    // 1. 從 header 中獲取 token
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ code: 401, error: "No token provided" })
    }

    try {
        // 2. 驗證 token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not set")
        }
        const secretKey = process.env.JWT_SECRET
        const decoded = jwt.verify(token, secretKey)

        // 3. 將解出的 payload 資訊放入 req.user
        req.user = decoded as UserPayload

        // 4. 驗證通過後進入下一步
        return next()
    } catch (err) {
        console.error("Invalid token:", err)
        return res.status(401).json({ code: 401, error: "Invalid token" })
    }
}
