import express from "express";
import { verifyRole } from "../middlewares/authMiddlewares/verifyRole";
import { verifyToken } from "../middlewares/authMiddlewares/verifyToken";
import { createUser, deleteUser, findAllUser, studentDashboard, updateUser, uploadAssignment, bulkUploadAssignment, professorDashboard, approvedByProffAssignments } from "../controllers/userController";
import { upload } from "../config/uploadConfig";

const router = express.Router();

router.get("/admin", verifyToken, verifyRole(["ADMIN", "STUDENT","PROFESSOR"]), findAllUser);
// router.get("/professorDeatils", verifyToken, verifyRole(["STUDENT"]), findAllProfessor);
router.put("/admin/:id/edit", verifyToken, verifyRole(["ADMIN"]), updateUser);
router.delete("/admin/:id/update", verifyToken, verifyRole(["ADMIN"]), deleteUser);
router.get("/student/dashboard", verifyToken, verifyRole(["STUDENT"]), studentDashboard);
router.get("/professor/dashboard", verifyToken, verifyRole(["PROFESSOR"]), professorDashboard);
router.post("/student/upload/Assignment", verifyToken, verifyRole(["STUDENT"]), upload.single("file"), uploadAssignment);
router.post("/student/bulkUpload/Assignment", verifyToken, verifyRole(["STUDENT"]), upload.array("file",5), bulkUploadAssignment);
router.post("/professor/approveAssignment",verifyToken, verifyRole(["PROFESSOR"]), approvedByProffAssignments);

export default router;