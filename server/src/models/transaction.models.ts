import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    dateTime: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paymentProvider: {
      type: String,
      enum: ["stripe", "razorpay"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

// Compound Index on userId and transactionId
transactionSchema.index({ userId: 1, _id: 1 });

// Compound Index on courseId
transactionSchema.index({ courseId: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
