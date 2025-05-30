import express from "express";
import {
  getUserEnrolledCourses,
  getUserCourseProgress,
  updateUserCourseProgress,
} from "../controllers/user.course.progress.controller";

const router = express.Router();

router.get("/:userId/enrolled-courses", getUserEnrolledCourses);
router.get("/:userId/courses/:courseId", getUserCourseProgress);
router.put("/:userId/courses/:courseId", updateUserCourseProgress);

export default router;
