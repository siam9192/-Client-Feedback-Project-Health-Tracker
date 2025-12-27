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



  createdAt: string; 
  updatedAt: string; 

 
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
export enum ProjectStatus {
  ON_TRACK = 'on_track',
  AT_RISK = 'at_risk',
  CRITICAL = 'critical',
  COMPLETED = 'completed',
}


export interface RiskProjectSummary {
  submittedEmployeeCheckins: number;
  expectedEmployeeCheckIns: number;
  missingEmployeeCheckins: number;
  submittedClientFeedbacks: number;
  openRisks: number;
  flaggedIssues: number;
}
