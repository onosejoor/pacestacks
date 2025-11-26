import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _retriedWithBackup?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        await axiosInstance.get("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/signin";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
