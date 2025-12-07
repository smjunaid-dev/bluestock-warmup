import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // this stores user_id and email for later use

    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
