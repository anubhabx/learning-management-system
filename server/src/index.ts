import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import serverless from "serverless-http";
import { connectToDatabase } from "./database/connect.database";
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth,
} from "@clerk/express";

// Route imports
import courseRoutes from "./routes/course.routes";
import userClerkRoutes from "./routes/userClerk.routes";
import transactionRoutes from "./routes/transaction.routes";
import userCourseProgressRoutes from "./routes/user.course.progress.routes";

// Configurations
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const MONGODB_URI = process.env.MONGODB_URI;

if (!isProduction) {
  //   console.log("Development environment");
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware());

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api/courses", courseRoutes);
app.use("/api/users/clerk", requireAuth(), userClerkRoutes);
app.use("/api/transactions", requireAuth(), transactionRoutes);
app.use("/api/users", requireAuth(), userCourseProgressRoutes);

// Start server
const PORT = process.env.PORT || 5000;
if (!isProduction) {
  app.listen(PORT, () => {
    connectToDatabase(MONGODB_URI!);
    //   console.log(`Server running on port ${PORT}`);
  });
}

// AWS production settings
const serverlessApp = serverless(app);

// Database connection for serverless environment
let isConnected = false;

export const handler = async (event: any, context: any) => {
  // Set this to false to prevent Lambda from waiting for empty event loop
  context.callbackWaitsForEmptyEventLoop = false;
  
  // Connect to database if not already connected
  if (isProduction && !isConnected) {
    try {
      await connectToDatabase(MONGODB_URI!);
      isConnected = true;
      // console.log("Connected to database in serverless environment");
    } catch (error) {
      console.error("Failed to connect to database:", error);
    }
  }
  
  return serverlessApp(event, context);
};
