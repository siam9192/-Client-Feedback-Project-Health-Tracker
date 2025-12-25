import { UserRole } from '../user/user.interface';
import { CreateActivityPayload } from './activity.interface';
import projectValidations from './activity.validation';

import { ActivityModel } from './activity.model';
import { objectId } from '../../helpers/utils.helper';
import { PaginationOptions } from '../../types';
import { calculatePagination } from '../../helpers/pagination.helper';
import { Types } from 'mongoose';

class ActivityService {
  async createDirectActivity(payload: CreateActivityPayload) {
    //  Validate payload
    payload = projectValidations.createActivitySchema.parse(payload);

    const { performerId, projectId, referenceId, ...others } = payload;
    // Create activity
    return await ActivityModel.create({
      ...others,
      referenceId: objectId(referenceId),
      performedBy: objectId(performerId),
      project: objectId(projectId),
    });
  }

  async getActivityTimelinesByProjectId(
    projectId: string,
    paginationOptions: PaginationOptions,
  ) {
    const { page, skip, limit } = calculatePagination(paginationOptions);

    const result = await ActivityModel.aggregate([
      {
        $match: { project: new Types.ObjectId(projectId) },
      },
      //  Lookups
      {
        $lookup: {
          from: 'employees',
          localField: 'performedBy',
          foreignField: '_id',
          as: 'emp',
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: 'performedBy',
          foreignField: '_id',
          as: 'cli',
        },
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'performedBy',
          foreignField: '_id',
          as: 'adm',
        },
      },

      // Add field
      {
        $addFields: {
          performer: {
            $switch: {
              branches: [
                {
                  case: { $eq: ['$performerRole', UserRole.ADMIN] },
                  then: { $arrayElemAt: ['$adm', 0] },
                },
                {
                  case: { $eq: ['$performerRole', UserRole.EMPLOYEE] },
                  then: { $arrayElemAt: ['$emp', 0] },
                },
                {
                  case: { $eq: ['$performerRole', UserRole.CLIENT] },
                  then: { $arrayElemAt: ['$cli', 0] },
                },
              ],
              default: null,
            },
          },

          dateKey: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
        },
      },

      {
        $project: {
          _id: 1,
          type: 1,
          content: 1,
          data: 1,
          dateKey: 1,
          createdAt: 1,
          performer: {
            _id: 1,
            name: 1,
            profilePicture: 1,
          },
        },
      },

      // Group by Date
      {
        $group: {
          _id: '$dateKey',
          activities: { $push: '$$ROOT' },
        },
      },

      // Final Pagination and Sorting
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                date: '$_id',
                _id: 0,
                activities: 1,
              },
            },
          ],
        },
      },
    ]);
    const data = result[0]?.data || [];
    const totalResults = result[0]?.metadata?.count || 0;
    return {
      data,
      meta: {
        page,
        limit,
        totalResults,
      },
    };
  }
}
export default new ActivityService();
