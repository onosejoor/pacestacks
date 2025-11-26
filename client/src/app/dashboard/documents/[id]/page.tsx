import DocumentDetails from "./_components/document-details";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen w-full px-4 md:px-7.5 relative pt-6">
      <DocumentDetails id={id} />
    </div>
  );
}
