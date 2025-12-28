"use server";
import { LoginPayload } from "@/types/auth.type";
import axiosInstance from "@/utils/axiosInstance";
import type { AxiosError } from "axios";
import { cookies } from "next/headers";
import SetCookie from "set-cookie-parser";
export async function login(payload: LoginPayload) {
  try {
    const res = await axiosInstance.post("/auth/login", payload);

    if (res.data.success) {
      const setCookieHeader = res.headers["set-cookie"]; // string[] | undefined
      const cookieStore = await cookies();

      if (setCookieHeader) {
        const parsedCookie = SetCookie.parse(setCookieHeader);
        parsedCookie.forEach((val) => {
          const { name, value, ...options } = val as any;
          cookieStore.set(name, value, options);
        });
      }
    }

    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
}

export async function logout() {
  try {
   const cookieStore = await cookies()
   cookieStore.delete("accessToken")
   cookieStore.delete("refreshToken")
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || "Something went wrong";

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function getNewAccessToken() {
  try {
    await axiosInstance.get("/auth/access-token");

    return null;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}
