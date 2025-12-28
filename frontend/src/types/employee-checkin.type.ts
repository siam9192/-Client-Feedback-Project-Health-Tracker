import z from "zod";
import { Project } from "./project.type";
import { Employee } from "./user.type";
import validators from "@/utils/validators";

export interface EmployeeCheckIn  {
   _id:string
  progressSummary: string;
  blockers?: string;
  confidenceLevel: number;
  completePercentage: number;
  week: number;
  year: number;
  project:EmployeeCheckInProject;
  employee:EmployeeCheckInEmployee ;
  createdAt: Date;
  updatedAt: Date;
}


export type PendingCheckIn = Pick<Project,"_id"|"name"|"status"|"healthScore"|"progressPercentage"|"startDate"|"endDate">
export type EmployeeCheckInEmployee  = Pick<Employee,"_id"|"name"|"profilePicture">
export type EmployeeCheckInProject = Pick<Project,"_id"|"name">



export type CreateEmployeeCheckInPayload = z.infer<typeof validators.createEmployeeCheckinSchema>



