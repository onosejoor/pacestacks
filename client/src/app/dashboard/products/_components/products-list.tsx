"use client";

import { useProducts } from "@/hooks/use-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import LoaderDisplay from "@/components/loader-display";
import ErrorDisplay from "@/components/error-display";
import { getErrorMessage } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";

export default function ProductsList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { products, isLoading, isError, totalPages, currentPage } = useProducts(
    {
      page,
      limit: 9, // Grid 3x3
      search,
    }
  );

  if (isLoading) {
    return <LoaderDisplay text="Loading products..." />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message={getErrorMessage(isError)}
        title="Error loading products"
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <Card className="h-screen">
        <CardContent>
          <p className="text-center text-muted-foreground">
            No products found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product: IProduct) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}

const ProductCard = ({ product }: { product: IProduct }) => (
  <Link href={`/dashboard/products/${product._id}`} className="block">
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className="text-sm font-medium truncate"
          title={product.name}
        >
          {product.name}
        </CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${(product.sellPrice as any)?.$numberDecimal || product.sellPrice}
        </div>
        <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
        <div className="text-xs text-muted-foreground mt-1">
          Stock: {product.quantity}
        </div>
      </CardContent>
    </Card>
  </Link>
);
