import { Request, Response } from "express";
import * as productService from "@/services/product.service";
import logger from "@/configs/logger";
import { getErrorMessage } from "@/utils/utils";

/**
 * Get all products with optional search and pagination
 * GET /products?search=&page=1&limit=10
 */
export async function getAllProductsController(req: Request, res: Response) {
  try {
    const { search, page, limit } = req.query;

    const filters = {
      search: search as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 10,
    };

    const result = await productService.getAllProducts(filters);

    res.status(200).json(result);
  } catch (error) {
    logger.error("Error getting products:", error as any);
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}

/**
 * Get a single product by ID
 * GET /products/:id
 */
export async function getProductByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const result = await productService.getProductById(id, req.user!.role);

    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error getting product: ${error}`);
    const statusCode =
      error instanceof Error && error.message.includes("not found") ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}

/**
 * Create a new product
 * POST /products
 */
export async function createProductController(req: Request, res: Response) {
  try {
    const productData = req.body;

    const result = await productService.createProduct(productData);

    res.status(201).json(result);
  } catch (error: any) {
    logger.error(`Error creating product: ${error}`);

    res.status(error.code).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}

/**
 * Update a product by ID
 * PUT /products/:id
 */
export async function updateProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await productService.updateProduct(id, updateData);

    res.status(200).json(result);
  } catch (error: any) {
    logger.error(`Error updating product: ${error}`);
    res.status(error.code).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}

/**
 * Delete a product by ID (Admin only)
 * DELETE /products/:id
 */
export async function deleteProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const result = await productService.deleteProduct(id);

    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error deleting product: ${error}`);
    const statusCode =
      error instanceof Error && error.message.includes("not found") ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}
