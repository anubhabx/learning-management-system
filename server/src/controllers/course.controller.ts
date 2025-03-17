import { Request, Response } from "express";
import Course from "../models/course.model.ts";
import { getAuth } from "@clerk/express";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;
  try {
    const courses =
      category && category !== "all"
        ? await Course.find({ category: category as string })
        : await Course.find();

    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching courses", error });
  }
};

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching course", error });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  const { teacherId, teacherName } = req.body;

  if (!teacherId || !teacherName) {
    res.status(400).json({
      success: false,
      message: "Teacher ID and name are required",
    });
    return;
  }

  try {
    const newCourse = new Course({
      teacherId,
      teacherName,
      courseTitle: "Untitled Course",
      courseDescription: "",
      courseImage: "",
      price: 0,
      category: "uncategorized",
      level: "Beginner",
      status: "Draft",
      sections: [],
      enrollments: [],
    });

    const course = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating course", error });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const updatedData = { ...req.body };
  const { userId } = getAuth(req);

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }

    if (course.teacherId !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      });
      return;
    }

    if (updatedData.price) {
      updatedData.price = parseInt(updatedData.price);
      if (isNaN(updatedData.price)) {
        res.status(400).json({
          success: false,
          message: "Price must be a number",
        });
        return;
      }
      updatedData.price = updatedData.price * 100;
    }

    if (course.enrollments) {
      updatedData.enrollments = course.enrollments.map((enrollment: any) => {
        // console.log("Enrollment:", enrollment);
        return {
          userId: enrollment.userId,
          enrolledOn: enrollment.enrolledOn || new Date().toISOString(),
        };
      });
    }

    if (updatedData.sections) {
      const sectionData =
        typeof updatedData.sections === "string"
          ? JSON.parse(updatedData.sections)
          : updatedData.sections;

      updatedData.sections = sectionData.map((section: any) => ({
        ...section,
        chapters: section.chapters.map((chapter: any) => ({
          ...chapter,
        })),
      }));
    }

    Object.assign(course, updatedData);

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating course", error });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { userId } = getAuth(req);

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }

    if (course.teacherId !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course",
      });
      return;
    }

    await Course.deleteOne({ _id: courseId });

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting course", error });
  }
};

export const getUploadVideoUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    res.status(400).json({
      success: false,
      message: "File name and type are required",
    });
    return;
  }

  try {
    const uniqueId = uuidv4();
    const s3Key = `videos/${uniqueId}/${fileName}`;

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: s3Key,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read",
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
    const videoUrl = `${process.env.AWS_CLOUDFRONT_URL}/videos/${uniqueId}/${fileName}`;

    res.status(200).json({
      success: true,
      message: "Upload URL generated successfully",
      data: { uploadUrl, videoUrl },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error getting upload URL", error });
  }
};
