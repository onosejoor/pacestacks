import { axiosInstance } from "@/app/axios-instance";
import { getErrorMessage } from "@/lib/utils";
import { isAxiosError } from "axios";
import { mutate } from "swr";

export async function uploadDocument(formData: FormData) {
  try {
    const { data } = await axiosInstance.post<APIRes>(
      `/documents/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { ...data };
  } catch (error) {
    console.error("Error uploading document: ", error);
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function deleteDocument(id?: string) {
  try {
    const { data } = await axiosInstance.delete<APIRes>(`/documents/${id}`);

    if (data.success) {
      mutateDocument();
    }

    return { ...data };
  } catch (error) {
    console.error("Error deleting product: ", error);
    return { success: false, message: getErrorMessage(error) };
  }
}

export const mutateDocument = () => {
  mutate((key) => typeof key === "string" && key.startsWith("/documents"));
};
