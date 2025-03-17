import mongoose from "mongoose";

export const connectToDatabase = async (MONGODB_URI: string) => {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      //   console.log("Connected to database");
    })
    .catch((error) => {
      console.error("Error connecting to database: ", error);
    });
};
