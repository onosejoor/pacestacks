import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface UseDocumentsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useDocuments({
  page = 1,
  limit = 10,
}: UseDocumentsParams = {}) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const { data, error, isLoading } = useSWR<
    APIRes<{ documents: IDocument[]; totalPages: number; currentPage: number }>
  >(`/documents?${queryParams.toString()}`, fetcher);

  return {
    documents: data?.data?.documents,
    totalPages: data?.data?.totalPages || 0,
    currentPage: data?.data?.currentPage || 1,
    isLoading,
    isError: error,
  };
}

export function useDocument(id: string) {
  const { data, error, isLoading } = useSWR<APIRes<IDocument & { role: Role }>>(
    id ? `/documents/${id}` : null,
    fetcher
  );

  return {
    document: data?.data,
    isLoading,
    isError: error,
  };
}
