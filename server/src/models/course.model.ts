import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const chapterSchema = new Schema({
  type: {
    type: String,
    enum: ["Text", "Video", "Quiz"],
    required: true,
  },
  chapterName: {
    type: String,
    required: true,
  },
  chapterContent: {
    type: String,
    required: true,
  },
  comments: {
    type: [commentSchema],
  },
  video: {
    type: String,
  },
});

const sectionSchema = new Schema({
  sectionTitle: {
    type: String,
    required: true,
  },
  sectionDescription: {
    type: String,
    required: true,
  },
  chapters: {
    type: [chapterSchema],
  },
});

const enrollmentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  enrolledOn: {
    type: Date,
    required: true,
  },
});

const courseSchema = new Schema(
  {
    teacherId: {
      type: String,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      required: true,
    },
    sections: {
      type: [sectionSchema],
    },
    enrollments: {
      type: [enrollmentSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
