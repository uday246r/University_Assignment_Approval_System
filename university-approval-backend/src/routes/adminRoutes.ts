import express from "express";
import { getAdminDashboard } from "../controllers/adminController";
import { verifyRole} from "../middlewares/authMiddlewares/verifyRole";
import { verifyToken } from "../middlewares/authMiddlewares/verifyToken";

const router = express.Router();

router.get("/dashboard", verifyToken, verifyRole(["ADMIN"]), getAdminDashboard);


export default router;