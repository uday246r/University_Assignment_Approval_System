import express from "express";
import "./config/env";
import prisma from "./utils/prisma";

import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import userRoutes from "./routes/userRoutes";
// import { errorHandler } from "./middlewares/errorHandler";
// // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// // Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/department", departmentRoutes);
app.use("/api/admin/user", userRoutes);

// // Basic route
app.get("/", async(req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/departments", departmentRoutes);
// app.use("/api/users", userRoutes);

// // Error handler middleware (should be last)
// app.use(errorHandler);

// // Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

// export default app;

