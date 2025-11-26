import { Role } from "@/types/globals";
import { jwtConstants } from "@/utils/consts";
import { createHash, randomBytes } from "crypto";
import { jwtVerify, SignJWT } from "jose";
import { TextEncoder } from "util";

export type Payload = {
  role: Role;
  id: string;
};

export function encryptAccessToken(payload: Payload) {
  const secretKey = jwtConstants.access.secret;
  const encodedKey = new TextEncoder().encode(secretKey);
  const expiresAt = new Date(Date.now() + jwtConstants.access.cookieExpiresMs);

  return new SignJWT(payload)
    .setExpirationTime(expiresAt)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt(Date.now())
    .sign(encodedKey);
}

export const decryptAccessToken = (token: string) => {
  const secretKey = jwtConstants.access.secret;
  const encodedKey = new TextEncoder().encode(secretKey);
  return jwtVerify<Payload>(token, encodedKey, {
    algorithms: ["HS256"],
  });
};

export const generateToken = (): string => {
  return randomBytes(64).toString("hex");
};

export const hashToken = (token: string) => {
  return createHash("sha256").update(token).digest("hex");
};
