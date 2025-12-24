import { Schema, model } from 'mongoose';
import {
  ProjectRisk,
  IssueStatus,
  ProjectRiskStatus,
  ProjectRiskSeverity,
} from './project-risk.interface';

const ProjectRiskModelSchema = new Schema<ProjectRisk>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    severity: {
      type: String,
      enum: Object.values(ProjectRiskSeverity),
      required: true,
    },
    mitigationPlan: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ProjectRiskStatus),
      default: ProjectRiskStatus.OPEN,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    resolvedAt: Date,
  },
  {
    timestamps: true,
  },
);

export const ProjectRiskModel = model<ProjectRisk>(
  'ProjectRisk',
  ProjectRiskModelSchema,
);
