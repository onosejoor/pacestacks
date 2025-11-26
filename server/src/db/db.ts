import mongoose from "mongoose";
import logger from "../configs/logger";
import { appConfig } from "@/configs/app.config";
import { AppError } from "@/configs/app-error";

export default async function connectDB() {
  const MONGODB_URI = appConfig.mongodb.uri;

  if (!MONGODB_URI) {
    throw new AppError("mongodb url missing. add it in the .env file");
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: true,
    });
    logger.info(`connected to mongodb from host: ${conn.connection.host} `);
  } catch (error) {
    throw error;
  }
}
