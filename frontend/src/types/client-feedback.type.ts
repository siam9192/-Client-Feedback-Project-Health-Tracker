import validators from "@/utils/validators";
import z from "zod";
import { Project } from "./project.type";
import { Client } from "./user.type";

export interface ClientFeedback {
  satisfactionRating: number;
  communicationRating: number;
  comment?: string;
  issue?: {
    description: string;
    status: IssueStatus;
    resolvedAt?: Date;
  };
  issueFlagged: boolean;
  week: number;
  year: number;
  project: ClientFeedbackProject;
  client: ClientFeedbackClient;
  createdAt: Date;
  updatedAt: Date;
}

type ClientFeedbackProject = Pick<Project, "_id" | "name" | "status">;

type ClientFeedbackClient = Pick<Client, "_id" | "name" | "profilePicture">;

export type CreateClientFeedbackPayload = z.infer<typeof validators.createClientFeedbackSchema>;

export enum IssueStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
}
