"use server";
import { Params } from "@/types";
import { IResponse } from "@/types/response.type";
import { ProjectRisk } from "@/types/risk.type";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export async function getRisks(params: Params) {
  try {
    const res = await axiosInstance.get<IResponse<ProjectRisk[]>>(`/project-risks`, { params });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}
