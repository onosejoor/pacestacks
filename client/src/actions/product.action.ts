import { ProductSchema } from "@/lib/configs/schema.config";
import { axiosInstance } from "@/app/axios-instance";
import { getErrorMessage } from "@/lib/utils";
import { mutate } from "swr";

export async function createProduct(formData: ProductSchema) {
  try {
    const { data } = await axiosInstance.post<APIRes>(`/products`, formData);

    return { ...data };
  } catch (error) {
    console.error("Error creating product: ", error);
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function updateProduct(formData: ProductSchema, id?: string) {
  try {
    const { data } = await axiosInstance.put<APIRes>(
      `/products/${id}`,
      formData
    );

    return { ...data };
  } catch (error) {
    console.error("Error updating product: ", error);
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function deleteProduct(id?: string) {
  try {
    const { data } = await axiosInstance.delete<APIRes>(`/products/${id}`);

    if (data.success) {
      mutateProduct();
    }
    return { ...data };
  } catch (error) {
    console.error("Error deleting product: ", error);
    return { success: false, message: getErrorMessage(error) };
  }
}

export const mutateProduct = () => {
  mutate((key) => typeof key === "string" && key.startsWith("/products"));
};
