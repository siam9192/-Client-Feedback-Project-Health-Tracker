import { Document, Types } from 'mongoose';
import z from 'zod';
import projectValidations from './activity.validation';
import { UserRole } from '../user/user.interface';

export interface Activity extends Document {
  type: ActivityType;
  content: String;
  data: Record<string, any>;
  referenceId: Types.ObjectId;
  project?: Types.ObjectId;

  performerRole: UserRole;
  performedBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export enum ActivityType {
  CHECKIN = 'checkin',
  FEEDBACK = 'feedback',
  RISK = 'risk',
  STATUS_CHANGE = 'status_change',
}

export type CreateActivityPayload = z.infer<
  typeof projectValidations.createActivitySchema
>;
