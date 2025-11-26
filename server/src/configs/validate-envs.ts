import { AppError } from "./app-error";

export const validateEnvs = () => {
  const requiredEnvs = [
    "PORT",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "MONGODB_URI",
  ];

  requiredEnvs.forEach((env) => {
    if (!process.env[env]) {
      throw new AppError(`Missing environment variable: ${env}`);
    }
    console.log(`✅ ${env} is available`);
  });
};
