import { Response } from "express";
import { jwtConstants } from "@/utils/consts";
import { appConfig } from "@/configs/app.config";

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export async function createSession({
  res,
  accessToken,
  refreshToken,
}: Params) {
  const accessExpiresAt = new Date(
    Date.now() + jwtConstants.access.cookieExpiresMs
  );
  const refreshExpiresAt = new Date(
    Date.now() + jwtConstants.refresh.cookieExpiresMs
  );

  const isProd = appConfig.env === "production";

  res.cookie("pacestacks_atoken", accessToken, {
    sameSite: "lax",
    httpOnly: true,
    expires: accessExpiresAt,
    maxAge: jwtConstants.access.cookieExpiresMs,
    path: "/",
    secure: isProd,
  });

  res.cookie("pacestacks_rtoken", refreshToken, {
    sameSite: "lax",
    httpOnly: true,
    expires: refreshExpiresAt,
    maxAge: jwtConstants.refresh.cookieExpiresMs,
    path: "/",
    secure: isProd,
  });
}
