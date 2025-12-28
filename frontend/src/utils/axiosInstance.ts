"use server";
import axios from "axios";
import envConfig from "./envConfig";
import { getNewAccessToken, logout } from "@/services/api/auth.api.service";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: envConfig.api_base_url,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async function (config) {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// axiosInstance.interceptors.response.use(undefined, async (error) => {
//   if (error.response?.status === 401) {
//     try {
//        await getNewAccessToken();
//        return axiosInstance(error.config);
//     } catch (error) {
//        await logout()
//     }

//   }

//   throw error;
// });
export default axiosInstance;
