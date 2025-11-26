import { appConfig } from "@/configs/app.config";

export const jwtConstants = {
  refresh: {
    secret: appConfig.jwt.refresh,
    cookieExpiresMs: 30 * 24 * 60 * 60 * 1000,
    jwtExpiresSeconds: 30 * 24 * 60 * 60,
  },

  access: {
    secret: appConfig.jwt.access,
    cookieExpiresMs: 30 * 60 * 1000,
    jwtExpiresSeconds: 30 * 60,
  },
};
