import express from "express";
import {
  getEmployees,
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../Controller/employeeController.js";
import {
  uploadEmployeeImage,
  deleteEmployeeImage,
  getEmployeeImage,
} from "../Controller/Profile.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.get("/", protect, getEmployees);
router.get("/:id", protect, getEmployee);
router.get("/:id/image", getEmployeeImage);
router.post("/:id/image", upload.single("image"), uploadEmployeeImage);
router.delete("/:id/image", deleteEmployeeImage);

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("profileImage"),
  addEmployee
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("profileImage"),
  updateEmployee
);
router.delete("/:id", protect, adminOnly, deleteEmployee);

export default router;
