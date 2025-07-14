import express from "express";
import { getCategoryItems, updateItemRoute } from "../controllers/inventoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/categories/:categoryId/items", protect, getCategoryItems);
router.put("/items/:itemId/route", protect, updateItemRoute);

export default router;
