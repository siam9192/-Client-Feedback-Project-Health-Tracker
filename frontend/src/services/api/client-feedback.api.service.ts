"use server";
import { ClientFeedback, CreateClientFeedbackPayload } from "@/types/client-feedback.type";
import {} from "@/types/employee-checkin.type";
import { IResponse } from "@/types/response.type";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export async function createClientFeedback(payload: CreateClientFeedbackPayload) {
  try {
    const res = await axiosInstance.post<IResponse<null>>("/client-feedbacks", payload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}

export async function getLatestClientFeedback() {
  try {
    const res = await axiosInstance.get<IResponse<ClientFeedback>>("/client-feedbacks/latest");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}
