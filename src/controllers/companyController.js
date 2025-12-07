import { pool } from "../config/db.js";

export const saveCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { company_name, industry, address, city, state, country, postal_code } = req.body;

    // validation
    if (!company_name || !industry || !address || !city || !state || !country || !postal_code) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // check if profile exists
    const exists = await pool.query(
      "SELECT id FROM company_profile WHERE owner_id = $1",
      [userId]
    );

    if (exists.rows.length > 0) {
      // update existing profile
      await pool.query(
        `UPDATE company_profile
         SET company_name = $2,
             industry = $3,
             address = $4,
             city = $5,
             state = $6,
             country = $7,
             postal_code = $8,
             updated_at = CURRENT_TIMESTAMP
         WHERE owner_id = $1`,
        [userId, company_name, industry, address, city, state, country, postal_code]
      );

      return res.json({ success: true, message: "Company profile updated" });
    }

    // insert new profile
    await pool.query(
      `INSERT INTO company_profile (owner_id, company_name, industry, address, city, state, country, postal_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, company_name, industry, address, city, state, country, postal_code]
    );

    return res.json({ success: true, message: "Company profile saved" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
