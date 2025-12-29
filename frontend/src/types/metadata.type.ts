import { ProjectStatus } from "./project.type";

export type EmployeeDashboardSummary = {
  assignedProjects: number;
  pendingWeeklyCheckIns: number;
  openRisks: number;
  avgProgress: number;
};

export type AdminDashboardSummary = {
  users: number;
  activeProjects: number;
  pendingProjects: number;
  highRiskProjects: number;
};

export type ClientDashboardSummary = {
  assignedProjects: number;
  activeProjects: number;
  pendingWeeklyFeedbacks: number;
  currentHealthStatus: ProjectStatus;
};
