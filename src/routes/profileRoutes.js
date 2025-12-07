import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/profileController.js";

const router = Router();

router.get("/me", authMiddleware, getProfile);

export default router;
