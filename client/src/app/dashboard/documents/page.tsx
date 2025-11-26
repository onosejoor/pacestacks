import DocumentsList from "./_components/documents-list";
import Banner from "@/components/banner";
import Search from "@/components/search";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-7.5 relative pt-6">
      <Banner
        title="Documents"
        description="Manage your uploaded documents"
        buttonText="Upload Document"
        buttonLink="/dashboard/documents/upload"
      />
      <div className="mb-6">
        <Search placeholder="Search documents..." />
      </div>
      <DocumentsList />
    </div>
  );
}
