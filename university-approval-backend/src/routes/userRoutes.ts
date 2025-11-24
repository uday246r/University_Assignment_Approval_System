import express from "express";
import { verifyRole } from "../middlewares/authMiddlewares/verifyRole";
import { verifyToken } from "../middlewares/authMiddlewares/verifyToken";
import { createUser, deleteUser, findAllUser, studentDashboard, updateUser, uploadAssignment, bulkUploadAssignment } from "../controllers/userController";
import { upload } from "../config/uploadConfig";

const router = express.Router();

router.post("/createUser", verifyToken, verifyRole(["ADMIN"]), createUser);
router.get("/", verifyToken, verifyRole(["ADMIN"]), findAllUser);
router.put("/:id/edit", verifyToken, verifyRole(["ADMIN"]), updateUser);
router.delete("/:id/update", verifyToken, verifyRole(["ADMIN"]), deleteUser);
router.get("/dashboard", verifyToken, verifyRole(["STUDENT"]), studentDashboard);
router.post("/upload/Assignment", verifyToken, verifyRole(["STUDENT"]), upload.single("file"), uploadAssignment);
router.post("/bulkUpload/Assignment", verifyToken, verifyRole(["STUDENT"]), upload.array("file",5), bulkUploadAssignment);


export default router;