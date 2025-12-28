"use server";
import { Params } from "@/types";
import { IResponse } from "@/types/response.type";
import { Client, Employee } from "@/types/user.type";
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

export async function getClients(params: Params) {
  try {
    const res = await axiosInstance.get<IResponse<Client[]>>("/users/clients", { params });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || "Something went wrong";
    // Re-throw clean error
    throw new Error(message);
  }
}

export async function getEmployees(params: Params) {
  try {
    const res = await axiosInstance.get<IResponse<Employee[]>>("/users/employees", { params });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || "Something went wrong";
    // Re-throw clean error
    throw new Error(message);
  }
}
