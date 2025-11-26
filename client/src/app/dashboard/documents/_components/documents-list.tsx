"use client";

import { useDocuments } from "@/hooks/use-documents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import LoaderDisplay from "@/components/loader-display";
import ErrorDisplay from "@/components/error-display";

export default function DocumentsList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { documents, isLoading, isError, totalPages, currentPage } =
    useDocuments({
      page,
      limit: 9,
      search,
    });

  if (isLoading) {
    return <LoaderDisplay text="Loading documents..." />;
  }

  if (isError) {
    return <ErrorDisplay message="Error loading documents" title="Error" />;
  }

  if (!documents || documents.length === 0) {
    return <div className=""></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc: IDocument) => (
          <DocumentCard doc={doc} key={doc._id} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}

const DocumentCard = ({ doc }: { doc: IDocument }) => {
  return (
    <Link href={`/dashboard/documents/${doc._id}`} className="block">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle
            className="text-sm font-medium truncate"
            title={doc.originalName}
          >
            {doc.originalName}
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Uploaded by:{" "}
            {(doc.uploadedBy as UserData)?.name ||
              (doc.uploadedBy as any)?.email ||
              "Unknown"}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
