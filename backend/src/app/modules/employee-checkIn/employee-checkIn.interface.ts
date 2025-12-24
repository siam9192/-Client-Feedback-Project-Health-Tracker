import { Types } from 'mongoose';
import z from 'zod';
import employeeCheckInValidations from './employee-checkIn.validation';

export interface EmployeeCheckIn extends Document {
  progressSummary: string;
  blockers?: string;
  confidenceLevel: number;
  completePercentage: number;
  week: number;
  year: number;
  project: Types.ObjectId;
  employee: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEmployeeCheckInPayload = z.infer<
  typeof employeeCheckInValidations.createCheckInSchema
>;
