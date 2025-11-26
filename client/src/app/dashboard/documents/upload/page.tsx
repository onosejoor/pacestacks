import UploadDocumentForm from "../_components/upload-document-form";

export default function UploadDocumentPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-7.5 relative pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Upload Document
        </h1>
        <p className="text-sm text-gray-500">
          Select a PDF or DOCX file to upload.
        </p>
      </div>
      <UploadDocumentForm />
    </div>
  );
}
