import { UserRole } from "./user.type";

export interface Activity {
  _id: string;
  type: ActivityType;
  content: String;
  metadata?: Record<string, any>;
  referenceId?: string;
  project?: string;

  performerRole: ActivityPerformerRole;
  performedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityTimeline {
  date: string;
  activities: (Pick<Activity, "_id" | "type" | "content" | "metadata" | "createdAt"> & {
    performedBy?: {
      _id: string;
      name: string;
      profilePicture: string;
    };
  })[];
}

export enum ActivityType {
  CHECKIN = "checkin",
  FEEDBACK = "feedback",
  RISK = "risk",
  STATUS_CHANGE = "status_change",
}

export enum ActivityPerformerRole {
  ADMIN = UserRole.ADMIN,
  EMPLOYEE = UserRole.EMPLOYEE,
  CLIENT = UserRole.CLIENT,
  SYSTEM = "system",
}
