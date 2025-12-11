import express from "express";
import { getAdminDashboard } from "../controllers/adminController";
import { verifyRole} from "../middlewares/authMiddlewares/verifyRole";
import { verifyToken } from "../middlewares/authMiddlewares/verifyToken";
import { createUser } from "../controllers/userController";

const router = express.Router();

router.post("/createUser", verifyToken, verifyRole(["ADMIN"]), createUser);
router.get("/dashboard", verifyToken, verifyRole(["ADMIN"]), getAdminDashboard);


export default router;