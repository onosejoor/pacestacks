import { Types } from "mongoose";
import { Role } from "./globals";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: Role;
}

export { IUser };
