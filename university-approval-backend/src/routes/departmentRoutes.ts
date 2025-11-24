import express from "express";
import { createDepartment, deleteDepartment, findAllDepartment, updateDepartment } from "../controllers/departmentController";
import { verifyRole } from "../middlewares/authMiddlewares/verifyRole";
import { verifyToken } from "../middlewares/authMiddlewares/verifyToken";

const router = express.Router();

router.post("/createDepartment", verifyToken, verifyRole(["ADMIN"]), createDepartment);
router.get("/", verifyToken, verifyRole(["ADMIN"]), findAllDepartment);
router.put("/:id/edit", verifyToken, verifyRole(["ADMIN"]), updateDepartment);
router.delete("/:id/update", verifyToken, verifyRole(["ADMIN"]), deleteDepartment);

export default router;