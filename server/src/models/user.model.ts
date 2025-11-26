import mongoose, { model, Model, Schema } from "mongoose";
import argon2 from "argon2";
import { Role } from "@/types/globals";

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: Role;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: false, default: "" },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["staff", "admin"], default: "staff" },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPassword = await argon2.hash(this.password);

  this.password = hashedPassword;
  next();
});

const User: Model<IUser> =
  mongoose.models?.User || model<IUser>("User", UserSchema);

export default User;
