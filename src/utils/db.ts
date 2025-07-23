import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const MONGOURL = process.env.DB_URL as string; 

async function dbConnect() {
  try {
    await mongoose.connect(MONGOURL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
