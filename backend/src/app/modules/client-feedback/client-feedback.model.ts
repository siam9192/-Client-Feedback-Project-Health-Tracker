import { Schema, model } from 'mongoose';
import { ClientFeedback, IssueStatus } from './client-feedback.interface';

const ClientFeedbackModelSchema = new Schema<ClientFeedback>(
  {
    satisfactionRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    communicationRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: String,
    issueFlagged: {
      type: Boolean,
      default: false,
    },
    issue: {
      type: {
        description: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: Object.values(IssueStatus),
          default: IssueStatus.OPEN,
        },
        resolvedAt: {
          type: Date,
        },
      },
      required: function () {
        return this.issueFlagged;
      },
    },
    week: {
      type: Number,
      required: true,
      min: 1,
      max: 55,
    },
    year: {
      type: Number,
      required: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ClientFeedbackModel = model<ClientFeedback>(
  'ClientFeedback',
  ClientFeedbackModelSchema,
);
