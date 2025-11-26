import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (err: unknown) => {
  if (isAxiosError(err)) {
    return err.response?.data.message || err.response?.data;
  }
  return err instanceof Error ? err.message : "Internal Server Error";
};

export const SERVER_URl = process.env.SERVER_URL;

import { axiosInstance } from "@/app/axios-instance";

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
