import { Request, Response, NextFunction } from "express";
import { decryptAccessToken } from "@/session/token";
import logger from "@/configs/logger";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "staff" | "admin";
      };
    }
  }
}

/**
 * Middleware to verify JWT token and attach user to request
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get token from Authorization header
    const { pacestacks_atoken } = req.cookies;

    if (!pacestacks_atoken) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Verify and decrypt token
    const { payload } = await decryptAccessToken(pacestacks_atoken);

    if (!payload) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    // Attach user to request
    req.user = {
      id: payload.id,
      role: payload.role,
    };

    next();
  } catch (error) {
    logger.error(`Authentication error: ${error}`);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
}

/**
 * Middleware to check if user has required role(s)
 */
export function authorize(...allowedRoles: ("staff" | "admin")[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "You Cannot perform this action ",
      });
      return;
    }

    next();
  };
}

/**
 * Middleware to check if user is admin
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  return authorize("admin")(req, res, next);
}

/**
 * Middleware to check if user is staff or admin
 */
export function requireStaffOrAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return authorize("staff", "admin")(req, res, next);
}
