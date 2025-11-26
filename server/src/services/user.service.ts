import { AppError } from "@/configs/app-error";
import User from "@/models/user.model";
import { IUserPayload } from "@/types/globals";

export async function getUser(user: IUserPayload) {
  const { id } = user;
  const findUser = await User.findOne({ _id: id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return {
    success: true,
    message: "User found successfully",
    data: findUser,
  };
}
