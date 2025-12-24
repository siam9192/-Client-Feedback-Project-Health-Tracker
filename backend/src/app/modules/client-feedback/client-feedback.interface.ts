import { Types } from 'mongoose';
import z from 'zod';
import clientCheckInValidations from './client-feedback.validation';

export interface ClientFeedback extends Document {
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

  project: Types.ObjectId;
  client: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateClientFeedbackPayload = z.infer<
  typeof clientCheckInValidations.createFeedbackSchema
>;

export enum IssueStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
}
