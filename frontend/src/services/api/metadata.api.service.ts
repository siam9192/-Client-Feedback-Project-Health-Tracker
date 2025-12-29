"use server";

import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export async function getDashboardSummary() {
  try {
    const res = await axiosInstance.get("/metadata/dashboard-summary");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}
