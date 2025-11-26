import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface UseProductsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useProducts({
  page = 1,
  limit = 10,
  search = "",
}: UseProductsParams = {}) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    queryParams.append("search", search);
  }

  const { data, error, isLoading } = useSWR<
    APIRes<{ products: IProduct[]; totalPages: number; currentPage: number }>
  >(`/products?${queryParams.toString()}`, fetcher);

  return {
    products: data?.data?.products,
    totalPages: data?.data?.totalPages || 0,
    currentPage: data?.data?.currentPage || 1,
    isLoading,
    isError: error,
  };
}

export function useProduct(id: string) {
  const { data, error, isLoading } = useSWR<APIRes<IProduct & { role: Role }>>(
    id ? `/products/${id}` : null,
    fetcher
  );

  return {
    product: data?.data,
    isLoading,
    isError: error,
  };
}
