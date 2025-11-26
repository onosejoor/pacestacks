import { Router } from "express";
import * as productController from "@/controllers/product.controller";
import {
  authenticate,
  requireAdmin,
  requireStaffOrAdmin,
} from "@/middlewares/auth.middleware";
import validateSchema from "@/middlewares/validateShema";
import {
  createProductSchema,
  updateProductSchema,
} from "@/configs/shema.config";

const productRouter = Router();

// All product routes require authentication
productRouter.use(authenticate);

/**
 * GET /products
 * Get all products with optional search and pagination
 * Query params: search, page, limit
 * Accessible by: staff, admin
 */
productRouter.get("/", productController.getAllProductsController);

/**
 * GET /products/:id
 * Get a single product by ID
 * Accessible by: staff, admin
 */
productRouter.get("/:id", productController.getProductByIdController);

/**
 * POST /products
 * Create a new product
 * Accessible by: staff, admin
 */
productRouter.post(
  "/",
  requireStaffOrAdmin,
  validateSchema(createProductSchema),
  productController.createProductController
);

/**
 * PUT /products/:id
 * Update a product by ID
 * Accessible by: staff, admin
 */
productRouter.put(
  "/:id",
  requireStaffOrAdmin,
  validateSchema(updateProductSchema),
  productController.updateProductController
);

/**
 * DELETE /products/:id
 * Delete a product by ID
 * Accessible by: admin only
 */
productRouter.delete(
  "/:id",
  requireAdmin,
  productController.deleteProductController
);

export default productRouter;
