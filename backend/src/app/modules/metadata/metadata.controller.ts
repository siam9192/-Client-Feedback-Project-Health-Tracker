import { paginationOptionPicker } from '../../helpers/pagination.helper';
import catchAsync from '../../utils/catchAsync';
import httpStatus from '../../utils/http-status';
import { sendSuccessResponse } from '../../utils/response';
import { UserRole } from '../user/user.interface';
import metadataService from './metadata.service';

class MetadataController {
  getDashboardSummary = catchAsync(async (req, res) => {
    const role = req.user.role;
  
    let result;

    if (role === UserRole.ADMIN)
     {
       result = await metadataService.getAdminDashboardSummary();
     }
    else if (role === UserRole.EMPLOYEE)
   {
    result = await metadataService.getEmployeeDashboardSummary(req.user);
   }
    else {
      result = await metadataService.getClientDashboardSummary(req.user);
    }

    sendSuccessResponse(res, {
      message: 'Project created successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  });
}

export default new MetadataController();
