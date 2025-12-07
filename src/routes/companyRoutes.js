import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { saveCompanyProfile } from "../controllers/companyController.js";

const router = Router();

router.post("/save", authMiddleware, saveCompanyProfile);

export default router;
