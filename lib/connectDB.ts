import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const globalCache = globalThis as typeof globalThis & {
  mongoose?: typeof mongoose;
};

export async function connectDB() {
  if (globalCache.mongoose) {
    console.log("Database already connected");
    return globalCache.mongoose;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  globalCache.mongoose = await mongoose.connect(MONGODB_URI);

  console.log("Database connected successfully");

  return globalCache.mongoose;
}