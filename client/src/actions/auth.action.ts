import { LoginSchema, RegisterSchema } from "@/lib/configs/schema.config";
import { axiosInstance } from "@/app/axios-instance";
import { getErrorMessage } from "@/lib/utils";

export async function loginUser(formData: LoginSchema) {
  try {
    const { data } = await axiosInstance.post<APIRes>(`/auth/login`, formData, {
      withCredentials: true,
    });

    return { ...data };
  } catch (error) {
    console.error("Error signing up: ", error);
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function registerUser(formData: RegisterSchema) {
  try {
    const { data } = await axiosInstance.post<APIRes>(
      `/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );

    return { ...data };
  } catch (error) {
    console.error("Error signing up: ", error);

    return { success: false, message: getErrorMessage(error) };
  }
}
