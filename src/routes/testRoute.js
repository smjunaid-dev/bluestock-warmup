import { Router } from "express";
import { pool } from "../config/db.js";

const router = Router();

router.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
