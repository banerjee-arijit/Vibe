import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB connected successfully");
  } catch (error) {
    console.log("Failed to connec to DB", error);
    process.exit(1);
  }
};
