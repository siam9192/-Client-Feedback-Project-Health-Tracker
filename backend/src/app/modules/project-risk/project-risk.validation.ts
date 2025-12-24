import z from 'zod';
import { Types } from 'mongoose';
import { ProjectRiskStatus } from './project-risk.interface';

export const createRiskSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be in  100 characters'),
  severity: z.enum(['low', 'medium', 'high']),
  mitigationPlan: z
    .string()
    .min(10, 'Please provide a detailed mitigation plan'),
  status: z.enum(ProjectRiskStatus, 'Invalid status'),
  projectId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid Project ID',
  }),
});

const projectRiskValidations = {
  createRiskSchema,
};

export default projectRiskValidations;
