import mongoose from "mongoose";

const chapterProgressSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

const sectionProgressSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  chapterProgress: {
    type: [chapterProgressSchema],
  },
});

const userCourseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    enrollmentDate: {
      type: String,
      required: true,
    },
    overallProgress: {
      type: Number,
      required: true,
    },
    sections: {
      type: [sectionProgressSchema],
    },
    lastAccessedAt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserCourseProgress = mongoose.model(
  "UserCourseProgress",
  userCourseProgressSchema
);

export default UserCourseProgress;
