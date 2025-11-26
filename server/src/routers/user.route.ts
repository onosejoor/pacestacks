import express from "express";
import * as userController from "@/controllers/user.controller";
import { authenticate } from "@/middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.use(authenticate);

userRouter.get("/me", userController.getUserController);

export default userRouter;
