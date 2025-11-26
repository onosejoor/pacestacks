import ProductDetails from "./_components/product-details";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen w-full px-4 md:px-7.5 relative pt-6">
      <ProductDetails id={id} />
    </div>
  );
}
