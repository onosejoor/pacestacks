"use client";

import Banner from "@/components/banner";
import ProductsList from "./_components/products-list";

import CreateProductForm from "./_components/crud-product-form";
import Search from "@/components/search";

export default function ProductsPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-7.5 relative pt-6">
      <div
        className="absolute inset-0 -z-1"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
         repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
          WebkitMaskImage: `
  repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <Banner
        title="Products"
        description="Manage your product inventory"
        action={<CreateProductForm />}
      />
      <div className="mb-6">
        <Search placeholder="Search products..." />
      </div>
      <ProductsList />
    </div>
  );
}
