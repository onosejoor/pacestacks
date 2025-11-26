import zod, { z } from "zod";

export const registerSchema = zod.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().trim().min(4),
  role: z.enum(["staff", "admin"]).optional().default("staff"),
});

export const loginShema = zod.object({
  email: z.string().email(),
  password: z.string(),
});

// Product schemas
export const createProductSchema = zod.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(100, "Name cannot exceed 100 characters"),
  sku: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z0-9\-_]+$/,
      "SKU can only contain uppercase letters, numbers, hyphens and underscores"
    ),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),
  buyPrice: z.number().min(0, "Buy price cannot be negative"),
  sellPrice: z.number().min(0, "Sell price cannot be negative"),
  lowStockThreshold: z.number().int().min(0).optional().default(10),
});

export const updateProductSchema = zod.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(100, "Name cannot exceed 100 characters")
    .optional(),
  sku: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z0-9\-_]+$/,
      "SKU can only contain uppercase letters, numbers, hyphens and underscores"
    )
    .optional(),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(0, "Quantity cannot be negative")
    .optional(),
  buyPrice: z.number().min(0, "Buy price cannot be negative").optional(),
  sellPrice: z.number().min(0, "Sell price cannot be negative").optional(),
  lowStockThreshold: z.number().int().min(0).optional(),
});
