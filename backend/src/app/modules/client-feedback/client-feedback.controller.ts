import { paginationOptionPicker } from '../../helpers/pagination.helper';
import catchAsync from '../../utils/catchAsync';
import httpStatus from '../../utils/http-status';
import { sendSuccessResponse } from '../../utils/response';
import employeeCheckInService from './client-feedback.service';

class ProjectRiskController {
  createFeedback = catchAsync(async (req, res) => {
    const result = await employeeCheckInService.createFeedback(
      req.user,
      req.body,
    );
    sendSuccessResponse(res, {
      message: 'Feedback created successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  });

  getLatestFeedback = catchAsync(async (req, res) => {
    const result = await employeeCheckInService.getLatestFeedback(req.user);
    sendSuccessResponse(res, {
      message: 'Latest feedback retrieved successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });

  getFeedbacksByProjectId = catchAsync(async (req, res) => {
    const result = await employeeCheckInService.getFeedbacksByProjectId(
      req.params.projectId,
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: 'Project feedbacks retrieved successfully',
      statusCode: httpStatus.OK,
      ...result,
    });
  });
}

export default new ProjectRiskController();
