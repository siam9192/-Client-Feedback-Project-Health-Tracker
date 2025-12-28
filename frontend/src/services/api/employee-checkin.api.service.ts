'use server';

import { Params } from "@/types";
import { CreateEmployeeCheckInPayload, EmployeeCheckIn, PendingCheckIn } from "@/types/employee-checkin.type";
import { IResponse } from "@/types/response.type";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export async function getPendingCheckins(params: Params) {
  try {
    const res = await axiosInstance.get<IResponse<PendingCheckIn[]>>(
      "/employee-checkins/pending",
      {
        params
      },
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}



export async function createEmployeeCheckin(payload:CreateEmployeeCheckInPayload) {
  try {
    const res = await axiosInstance.post<IResponse<EmployeeCheckIn>>(
      "/employee-checkins",
      payload
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}
