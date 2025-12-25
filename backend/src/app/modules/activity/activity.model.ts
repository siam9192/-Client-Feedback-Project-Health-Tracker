import { model, Schema } from 'mongoose';
import { Activity, ActivityType } from './activity.interface';
import { UserRole } from '../user/user.interface';

const ActivityModelSchema = new Schema<Activity>(
  {
    type: {
      type: String,
      enum: Object.values(ActivityType),
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    data: Schema.Types.Mixed,

    referenceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    performerRole: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);
export const ActivityModel = model<Activity>('Activity', ActivityModelSchema);
