import { axiosInstance } from "@/app/axios-instance";
import { getErrorMessage } from "@/lib/utils";

export async function getUser() {
  try {
    const { data } = await axiosInstance.get<UserRes>(`/users/me`);

    return { ...data };
  } catch (error) {
    console.error("Error signing up: ", error);

    return {
      success: false,
      message: getErrorMessage(error),
      user: null,
    };
  }
}
