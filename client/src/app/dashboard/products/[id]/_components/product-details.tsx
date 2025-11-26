"use client";

import { useProduct } from "@/hooks/use-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoaderDisplay from "@/components/loader-display";
import ErrorDisplay from "@/components/error-display";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import CreateProductForm from "../../_components/crud-product-form";
import DeleteDataDialog from "@/components/delete-data-dialog";

export default function ProductDetails({ id }: { id: string }) {
  const router = useRouter();
  const { product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return <LoaderDisplay text="Loading product details..." />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message={getErrorMessage(isError)}
        title="Error loading product"
      />
    );
  }

  if (!product) {
    return <ErrorDisplay message="Product not found" title="Not Found" />;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex flex-col sm:flex-row gap-5">
            <CreateProductForm product={product} />
            {product.role === "admin" && (
              <DeleteDataDialog
                id={product._id}
                type="product"
                redirectUrl="/dashboard/products"
              />
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">SKU</p>
                <p className="text-lg">{product.sku}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Quantity
                </p>
                <p className="text-lg">{product.quantity}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Buy Price
                </p>
                <p className="text-lg">
                  $
                  {(product.buyPrice as any)?.$numberDecimal ||
                    product.buyPrice}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Sell Price
                </p>
                <p className="text-lg">
                  $
                  {(product.sellPrice as any)?.$numberDecimal ||
                    product.sellPrice}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Low Stock Threshold
                </p>
                <p className="text-lg">{product.lowStockThreshold}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Created At
                </p>
                <p className="text-lg">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
