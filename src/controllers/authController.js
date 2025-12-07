import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, password, full_name, gender, mobile_no } = req.body;

    // simple validation
    if (!email || !password || !full_name || !gender || !mobile_no) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const result = await pool.query(
      `INSERT INTO users (email, password, full_name, gender, mobile_no)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [email, hashedPassword, full_name, gender, mobile_no]
    );

    res.json({
      success: true,
      message: "User registered successfully",
      user_id: result.rows[0].id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    // check user
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    // verify password
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

