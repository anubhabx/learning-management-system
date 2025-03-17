import Stripe from "stripe";
import dotenv from "dotenv";
import { Request, Response } from "express";
import Course from "../models/course.model";
import Transaction from "../models/transaction.models";
import UserCourseProgress from "../models/userCourseProgress.model";
import mongoose from "mongoose";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("No STRIPE_SECRET_KEY provided");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount, description, buyerName, billingAddress } = req.body;

  if (!amount || amount <= 0) {
    amount = 50;
  }

  if (!description) {
    description = "Course Payment";
  }

  if (!buyerName) {
    buyerName = "John Doe";
  }

  if (!billingAddress) {
    billingAddress = {
      line1: "510 Townsend St",
      postal_code: "98140",
      city: "San Francisco",
      state: "CA",
      country: "US",
    };
  }

  try {
    // Create a customer with the buyer's name and billing address
    const customer = await stripe.customers.create({
      name: buyerName || "John Doe",
      address: billingAddress || {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    });

    // Create a Payment Intent with the description and customer ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      description: "Course Payment",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.status(200).json({
      message: "",
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create payment intent",
      error,
    });
  }
};

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId, transactionId, amount, paymentProvider } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
      return;
    }

    const newTransaction = new Transaction({
      dateTime: new Date().toISOString(),
      userId,
      courseId,
      transactionId,
      amount,
      paymentProvider,
    });

    await newTransaction.save();

    const initialProgress = new UserCourseProgress({
      userId,
      courseId,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 0,
      sections: course.sections.map((section) => ({
        _id: new mongoose.Types.ObjectId(),
        chapterProgress: section.chapters.map((chapter) => ({
          _id: new mongoose.Types.ObjectId(),
          isCompleted: false,
        })),
      })),
      lastAccessedAt: new Date().toISOString(),
    });

    await initialProgress.save();

    await Course.updateOne(
      { _id: courseId },
      {
        $push: {
          enrollments: {
            userId,
            enrolledAt: new Date().toISOString(),
          },
        },
      }
    );

    res.status(201).json({
      message: "Course enrolled successfully",
      data: {
        transaction: newTransaction,
        courseProgress: initialProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create transaction",
      error,
    });
  }
};

export const listTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.query;

  try {
    const transactions = await Transaction.find({ userId });

    if (!transactions) {
      res.status(404).json({
        message: "No transactions found",
      });
      return;
    }

    res.status(200).json({
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to list transactions",
      error,
    });
  }
};
