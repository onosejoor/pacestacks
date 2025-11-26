import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler";
import authRouter from "@/routers/auth.route";
import productRouter from "@/routers/product.route";
import documentRouter from "@/routers/document.route";
import logger from "./configs/logger";
import { validateEnvs } from "./configs/validate-envs";
import { appConfig } from "./configs/app.config";
import morgan from "morgan";
import userRouter from "./routers/user.route";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = appConfig.port || 8080;

app.get("/", function (_, res) {
  res.json("Connected");
});

app.use("/v1/api/auth", authRouter);
app.use("/v1/api/products", productRouter);
app.use("/v1/api/documents", documentRouter);
app.use("/v1/api/users", userRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  validateEnvs();
  await connectDB();
  logger.info(`Server running on port http://localhost:${PORT}`);
});
