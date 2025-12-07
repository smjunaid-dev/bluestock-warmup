import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import testRouter from "./routes/testRoute.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";





dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api", testRouter);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/company", companyRoutes);



app.get("/", (req, res) => {
  res.json({ message: "Backend is running..." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
