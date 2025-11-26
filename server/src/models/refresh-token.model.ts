import { createHash } from "crypto";
import mongoose, { Model, model, Types } from "mongoose";
import { hashToken } from "../session/token";

interface IRefreshToken {
  token: string;
  userId: mongoose.Schema.Types.ObjectId;
  expiresAt: Date;
}

const RefreshTokenSchema = new mongoose.Schema<IRefreshToken>({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 30 * 24 * 60 * 60 * 1000,
  },
});

RefreshTokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    return next();
  }
  const hashedToken = hashToken(this.token);
  this.token = hashedToken;
  next();
});

const RefreshToken: Model<IRefreshToken> =
  mongoose.models?.RefreshToken ||
  model<IRefreshToken>("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
