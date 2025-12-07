import { pool } from "../config/db.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      "SELECT full_name, email, mobile_no, gender FROM users WHERE id = $1",
      [userId]
    );

    res.json({ success: true, profile: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
