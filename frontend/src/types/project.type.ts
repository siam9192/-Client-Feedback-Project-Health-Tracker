import z from "zod";
import { UserRole } from "./user.type";
import validators from "@/utils/validators";

export interface Project {
  _id: string;
  name: string;
  description: string;

  startDate: string;
  endDate: string;

  status: ProjectStatus;
  progressPercentage: number;
  healthScore: number;

  client: ProjectClient;
  employees: ProjectEmployee[];
  lastCheckInAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type HighRiskProject = Pick<
  Project,
  "_id" | "name" | "client" | "status" | "progressPercentage" | "healthScore" | "client" | "endDate"
> & { summary: HighRiskProjectSummary };

export type ProjectHealthGroups = {
  status: ProjectStatus;
  projects: Project[];
}[];

export interface AssignedProject extends Project {
  checkinPending: boolean;
  feedbackPending: boolean;
}

export interface ProjectActivity {
  type: ActivityType;
  content: String;
  metadata: Record<string, any>;
  referenceId?: string;
  project?: string;

  performerRole: ActivityPerformerRole;
  performedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectClient {
  _id: string;
  name: string;
  profilePicture?: string;
}

export interface ProjectEmployee {
  _id: string;
  name: string;
  profilePicture?: string;
}

export type CreateProjectPayload = z.infer<typeof validators.createProjectSchema>;

export enum ProjectStatus {
  ON_TRACK = "on_track",
  AT_RISK = "at_risk",
  CRITICAL = "critical",
  COMPLETED = "completed",
}

export interface HighRiskProjectSummary {
  submittedEmployeeCheckins: number;
  expectedEmployeeCheckIns: number;
  missingEmployeeCheckins: number;
  submittedClientFeedbacks: number;
  openRisks: number;
  flaggedIssues: number;
}

export enum ActivityPerformerRole {
  ADMIN = UserRole.ADMIN,
  EMPLOYEE = UserRole.EMPLOYEE,
  CLIENT = UserRole.CLIENT,
  SYSTEM = "system",
}

export enum ActivityType {
  CHECKIN = "checkin",
  FEEDBACK = "feedback",
  RISK = "risk",
  STATUS_CHANGE = "status_change",
}
