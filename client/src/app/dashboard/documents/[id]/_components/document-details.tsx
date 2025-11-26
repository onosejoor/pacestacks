"use client";

import { useDocument } from "@/hooks/use-documents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoaderDisplay from "@/components/loader-display";
import ErrorDisplay from "@/components/error-display";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText } from "lucide-react";
import DeleteDataDialog from "@/components/delete-data-dialog";
import { deleteDocument } from "@/actions/document.action";

export default function DocumentDetails({ id }: { id: string }) {
  const router = useRouter();
  const { document, isLoading, isError } = useDocument(id);

  if (isLoading) {
    return <LoaderDisplay text="Loading document details..." />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message={getErrorMessage(isError)}
        title="Error loading document"
      />
    );
  }

  if (!document) {
    return <ErrorDisplay message="Document not found" title="Not Found" />;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6" />
            {document.originalName}
          </CardTitle>
          <div className="flex items-center gap-2">
            {document.role === "admin" && (
              <DeleteDataDialog
                id={document._id}
                type="document"
                redirectUrl="/dashboard/documents"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                File Name
              </p>
              <p className="text-lg truncate" title={document.fileName}>
                {document.fileName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                File Size
              </p>
              <p className="text-lg">
                {(document.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                MIME Type
              </p>
              <p className="text-lg">{document.mimeType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Uploaded By
              </p>
              <p className="text-lg">
                {(document.uploadedBy as UserData)?.name ||
                  (document.uploadedBy as any)?.email ||
                  "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Uploaded At
              </p>
              <p className="text-lg">
                {new Date(document.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
