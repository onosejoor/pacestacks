import { loginShema, registerSchema } from "@/configs/shema.config";
import validateSchema from "@/middlewares/validateShema";
import express from "express";
import * as authController from "@/controllers/auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateSchema(registerSchema),
  authController.signupController
);

authRouter.post(
  "/login",
  validateSchema(loginShema),
  authController.signinController
);

authRouter.get("/refresh-token", authController.refreshToken);

export default authRouter;
