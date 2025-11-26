import zod, { z } from "zod";

export const registerSchema = zod.object({
  email: z.email(),
  password: z.string(),
  name: z.string().trim().min(4),
  role: z.enum(["staff", "admin"]).optional().default("staff"),
});

export const loginShema = zod.object({
  email: z.email(),
  password: z.string(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginShema>;

export const productSchema = zod.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  quantity: z.coerce.number().min(0, "Quantity must be 0 or greater"),
  buyPrice: z.coerce.number().min(0, "Buy price must be 0 or greater"),
  sellPrice: z.coerce.number().min(0, "Sell price must be 0 or greater"),
  lowStockThreshold: z.coerce.number().min(0).default(10),
});

export type ProductSchema = z.infer<typeof productSchema>;
