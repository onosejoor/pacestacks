import mongoose, { Model } from "mongoose";

interface IProduct {
  name: string;
  sku: string;
  quantity: number;
  buyPrice: mongoose.Types.Decimal128 | number;
  sellPrice: mongoose.Types.Decimal128 | number;
  lowStockThreshold: number;
}

const formatNumber = (v: any) => parseFloat(v.toString());

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
      match: [
        /^[A-Z0-9\-_]+$/,
        "SKU can only contain uppercase letters, numbers, hyphens and underscores",
      ],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    buyPrice: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "Buy price is required"],
      get: formatNumber,
      validate: {
        validator: function (v: mongoose.Types.Decimal128) {
          return Number(v.toString()) >= 0;
        },
        message: "Buy price cannot be negative",
      },
    },
    sellPrice: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "Sell price is required"],
      get: formatNumber,
      validate: {
        validator: function (v: mongoose.Types.Decimal128) {
          return Number(v.toString()) >= 0;
        },
        message: "Sell price cannot be negative",
      },
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

ProductSchema.index({ name: "text", sku: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
