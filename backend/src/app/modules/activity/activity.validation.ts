import { Types } from 'mongoose';

import { ActivityType } from './activity.interface';
import z from 'zod';
import { UserRole } from '../user/user.interface';

export const createActivitySchema = z.object({
  type: z.nativeEnum(ActivityType, 'Invalid activity type'),

  content: z
    .string()
    .min(1, 'Content cannot be empty')
    .max(500, 'Content is too long'),

  data: z.record(z.string(), z.any()).optional(),

  referenceId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid Reference ID',
  }),

  projectId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid Project ID',
  }),

  performerRole: z.nativeEnum(UserRole, 'Invalid user role'),

  performerId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid Performer ID',
  }),
});

const activityValidations = {
  createActivitySchema,
};

export default activityValidations;
