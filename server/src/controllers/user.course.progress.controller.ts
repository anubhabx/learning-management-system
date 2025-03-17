import { Request, Response } from "express";
import UserCourseProgress from "../models/userCourseProgress.model";
import Course from "../models/course.model";
import { calculateOverallProgress, mergeSections } from "../utils/utils";

export const getUserEnrolledCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const enrolledCourses = await UserCourseProgress.find({ userId });

    const courseIds = enrolledCourses.map((course) => course.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } });

    res.status(200).json({
      success: true,
      message: "Enrolled courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enrolled courses",
      error,
    });
  }
};

export const getUserCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId } = req.params;

  try {
    const courseProgress = await UserCourseProgress.findOne({
      userId,
      courseId,
    });

    res.status(200).json({
      success: true,
      message: "Course progress retrieved successfully",
      data: courseProgress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching course progress",
      error,
    });
  }
};

export const updateUserCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId } = req.params;
  const progressData = req.body;

  try {
    let progress = await UserCourseProgress.findOne({
      userId,
      courseId,
    });

    if (!progress) {
      progress = new UserCourseProgress({
        userId,
        courseId,
        enrollmentDate: new Date().toISOString(),
        overallProgress: 0,
        sections: progressData.sections || [],
        lastAccessedAt: new Date().toISOString(),
      });
    } else {
      progress.set(
        "sections",
        mergeSections(progress.sections, progressData.sections || [])
      );
      progress.lastAccessedAt = new Date().toISOString();
      progress.overallProgress = calculateOverallProgress(progress.sections);
    }

    await progress.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating course progress",
      error,
    });
  }
};
