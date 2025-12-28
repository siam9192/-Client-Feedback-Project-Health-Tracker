import { Project, ProjectEmployee } from "./project.type";

export interface ProjectRisk {
  _id: string;
  title: string;
  severity: ProjectRiskSeverity;
  mitigationPlan: string;
  status: ProjectRiskStatus;
  resolvedAt: string;

  project: Pick<Project, "_id" | "name" | "healthScore">;
  employee: ProjectEmployee;

  createdAt: string;
  updatedAt: string;
}

export enum IssueStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
}

export enum ProjectRiskSeverity {
  HIGH = "high",
  LOW = "low",
  MEDIUM = "medium",
}

export enum ProjectRiskStatus {
  OPEN = "open",
  RESOLVED = "resolved",
}
