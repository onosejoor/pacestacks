import { AppError } from "@/configs/app-error";
import Product from "@/models/product.model";
import { ServiceRes } from "@/types/globals";

interface CreateProductDTO {
  name: string;
  sku: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  lowStockThreshold?: number;
}

interface UpdateProductDTO extends Partial<CreateProductDTO> {}

interface ProductFilters {
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Get all products with optional search and pagination
 */
export async function getAllProducts(
  filters: ProductFilters = {}
): Promise<ServiceRes> {
  const { search, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  // Build query
  const query: any = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }

  const [products, total] = await Promise.all([
    Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  return {
    success: true,
    message: "Products retrieved successfully",
    data: {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  };
}

/**
 * Get a single product by ID
 */
export async function getProductById(
  productId: string,
  role: string
): Promise<ServiceRes> {
  const product = await Product.findById(productId).exec();

  if (!product) {
    throw new AppError("Product not found");
  }

  return {
    success: true,
    message: "Product retrieved successfully",
    data: { ...product.toObject(), role },
  };
}

/**
 * Create a new product
 */
export async function createProduct(
  productData: CreateProductDTO
): Promise<ServiceRes> {
  const existingProduct = await Product.findOne({ sku: productData.sku });
  if (existingProduct) {
    throw new AppError("Product with this SKU already exists", 400);
  }
  if (productData.sellPrice < productData.buyPrice) {
    throw new AppError(
      "Sell price must be greater than or equal to buy price",
      400
    );
  }

  const product = await Product.create(productData);

  return {
    success: true,
    message: "Product created successfully",
    data: {
      id: product._id,
    },
  };
}

/**
 * Update a product by ID
 */
export async function updateProduct(
  productId: string,
  updateData: UpdateProductDTO
): Promise<ServiceRes> {
  // If SKU is being updated, check for duplicates
  if (updateData.sku) {
    const existingProduct = await Product.exists({
      sku: updateData.sku,
      _id: { $ne: productId },
    });
    if (existingProduct) {
      throw new AppError("Product with this SKU already exists", 400);
    }
  }

  const product = await Product.findById(productId)
    .select("buyPrice sellPrice")
    .lean();
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const newBuyPrice = updateData.buyPrice ?? product.buyPrice;
  const newSellPrice = updateData.sellPrice ?? product.sellPrice;

  if (newSellPrice < newBuyPrice) {
    throw new AppError(
      "Sell price must be greater than or equal to buy price",
      400
    );
  }

  await Product.findByIdAndUpdate(
    productId,
    { $set: updateData },
    { runValidators: true }
  );

  return {
    success: true,
    message: "Product updated successfully",
  };
}

/**
 * Delete a product by ID (Admin only)
 */
export async function deleteProduct(productId: string): Promise<ServiceRes> {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return {
    success: true,
    message: "Product deleted successfully",
    data: null,
  };
}
