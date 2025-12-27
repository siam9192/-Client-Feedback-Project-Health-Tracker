'use server';
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export async function getCurrentUser() {
  
  try {
    const res = await axiosInstance.get("/users/me");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || "Something went wrong";
    // Re-throw clean error
    throw new Error(message);
  }
}