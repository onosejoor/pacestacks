import { Request, Response } from "express";
import { createSession } from "@/session/session";
import * as authService from "@/services/auth.service";
import { loginShema, registerSchema } from "@/configs/shema.config";
import { z } from "zod";
import { jwtConstants } from "@/utils/consts";
import { appConfig } from "@/configs/app.config";

type SigninPayload = z.infer<typeof loginShema>;
type SignupPayload = z.infer<typeof registerSchema>;

export async function signinController(req: Request, res: Response) {
  const { email, password } = req.body as SigninPayload;

  const { data } = await authService.signin(email, password);

  await createSession({ res, ...data! });

  res.status(200).json({
    success: true,
    message: "User signed in successfully",
  });
}

export async function signupController(req: Request, res: Response) {
  const payload = req.body as SignupPayload;
  const { data } = await authService.signup(payload);

  await createSession({ res, ...data! });

  res.status(201).json({
    success: true,
    message: "User created successfully",
  });
}

export async function refreshToken(req: Request, res: Response) {
  const { pacestacks_rtoken } = req.cookies;

  if (!pacestacks_rtoken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token not found",
    });
  }

  const { data } = await authService.refreshAccessToken(pacestacks_rtoken);

  const accessExpiresAt = new Date(
    Date.now() + jwtConstants.access.cookieExpiresMs
  );

  const isProd = appConfig.env === "production";

  res.cookie("pacestacks_atoken", data.accessToken, {
    sameSite: "lax",
    httpOnly: true,
    expires: accessExpiresAt,
    maxAge: jwtConstants.access.cookieExpiresMs,
    path: "/",
    secure: isProd,
  });

  res.status(200).json({
    success: true,
    message: "Refresh token successfully",
  });
}
