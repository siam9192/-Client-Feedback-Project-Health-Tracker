"use server";
import { Params } from "@/types";
import {
  CreateProjectPayload,
  HighRiskProject,
  Project,
  ProjectHealthGroups,
} from "@/types/project.type";
import { IResponse } from "@/types/response.type";
import { ProjectRisk } from "@/types/risk.type";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export async function getMissingRecentCheckinsProjects(params: Params) {
  try {
    const res = await axiosInstance.get<IResponse<Project[]>>("/projects/missing-checkins", {
      params,
    });

    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}

export async function getHighRiskProjectsWithSummary(params: Params) {
  try {
    const res = await axiosInstance.get<IResponse<HighRiskProject[]>>("/projects/high-risks", {
      params,
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}

export async function getProjectById(id: string) {
  try {
    const res = await axiosInstance.get<IResponse<Project>>(`/projects/${id}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}

export async function getProjectHealthGroups() {
  try {
    const res = await axiosInstance.get<IResponse<ProjectHealthGroups>>("/projects/health-groups");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}

export async function getProjectRisks(id: string, params: Params) {
  try {
    const res = await axiosInstance.get<IResponse<ProjectRisk[]>>(`/projects/${id}/risks`, {
      params,
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}

export async function createProject(payload: CreateProjectPayload) {
  try {
    const res = await axiosInstance.post<IResponse<Project>>(`/projects`, payload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message = error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
}
