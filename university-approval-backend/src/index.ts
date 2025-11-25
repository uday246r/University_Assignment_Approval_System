import express from "express";
import "./config/env";
import prisma from "./utils/prisma";

import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import userRoutes from "./routes/userRoutes";
// import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 5000;
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/student", userRoutes);

app.get("/", async(req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});


