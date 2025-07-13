import express from "express"
import { createReturn } from "../controllers/returnController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/return", protect, createReturn)

export default router
