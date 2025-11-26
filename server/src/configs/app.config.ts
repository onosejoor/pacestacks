import { config } from "dotenv";

config();

export const appConfig = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",

  jwt: {
    access: process.env.JWT_ACCESS_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET,
  },

  mongodb: {
    uri: process.env.MONGODB_URI,
  },
};
