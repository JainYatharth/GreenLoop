import express from "express"
import { login, logout, register, verifyToken } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/signup", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/verify-token", verifyToken)

export default authRouter
