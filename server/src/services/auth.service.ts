import User from "@/models/user.model";
import argon2 from "argon2";
import { ServiceRes } from "@/types/globals";
import {
  encryptAccessToken,
  generateToken,
  hashToken,
  Payload,
} from "@/session/token";
import RefreshToken from "@/models/refresh-token.model";
import { registerSchema } from "@/configs/shema.config";
import { z } from "zod";
import { IUser } from "@/types/types";
import { AppError } from "@/configs/app-error";

type Res = {
  accessToken: string;
  refreshToken: string;
};

type SignUpProps = z.infer<typeof registerSchema>;

export async function signin(
  email: string,
  password: string
): Promise<ServiceRes<Res>> {
  const findUser = await User.findOne({ email }).select("+password");

  if (!findUser) {
    throw new AppError(`Invalid Credentials`, 400);
  }

  const passwordMatched = await argon2.verify(findUser.password, password);
  if (!passwordMatched) {
    throw new AppError("Invalid Credentials", 400);
  }

  const payload = {
    id: findUser._id.toString(),
    role: findUser.role,
  };

  const accessToken = await encryptAccessToken(payload);
  const rfToken = generateToken();

  await RefreshToken.create({
    token: rfToken,
    userId: findUser._id,
  });

  return {
    success: true,
    message: "User signed in successfully",
    data: {
      accessToken,
      refreshToken: rfToken,
    },
  };
}

export async function signup(signupDTO: SignUpProps) {
  const { email, name, password, role } = signupDTO;

  const findUser = await User.exists({ email });

  if (findUser) {
    throw new AppError(`email or username already exists`, 400);
  }

  const newUser = new User({
    email,
    name,
    password,
    role,
  });

  const payload: Payload = {
    role,
    id: newUser.id,
  };

  const accessToken = await encryptAccessToken(payload);
  const rfToken = generateToken();

  await Promise.all([
    newUser.save(),
    RefreshToken.create({
      token: rfToken,
      userId: newUser._id,
    }),
  ]);

  return {
    success: true,
    message: "User created successfully",
    data: {
      accessToken,
      refreshToken: rfToken,
    },
  };
}

export async function refreshAccessToken(token: string) {
  const hashedToken = hashToken(token);

  const refreshToken = await RefreshToken.findOne({
    token: hashedToken,
  }).populate<{ userId: IUser }>("userId");

  if (!refreshToken) {
    throw new AppError("Invalid refresh token", 400);
  }

  const payload: Payload = {
    role: refreshToken.userId.role,
    id: refreshToken.userId._id.toString(),
  };

  const accessToken = await encryptAccessToken(payload);

  return {
    success: true,
    message: "Access token refreshed successfully",
    data: {
      accessToken,
    },
  };
}
