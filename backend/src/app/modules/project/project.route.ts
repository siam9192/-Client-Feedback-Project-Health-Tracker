import { Router } from 'express';
import projectController from './project.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.interface';
import clientFeedbackController from '../client-feedback/client-feedback.controller';
import employeeCheckInController from '../employee-checkIn/employee-checkIn.controller';

const router = Router();

router.post('/', projectController.createProject);

router.get(
  '/assigned',
  auth(UserRole.EMPLOYEE, UserRole.CLIENT),
  projectController.getAssignedProjects,
);

router.get(
  '/group-by-status',
  auth(UserRole.EMPLOYEE, UserRole.CLIENT),
  projectController.getAllGroupProjectsByHealthStatus,
);

router.get(
  '/:projectId/employee-feedbacks',
  clientFeedbackController.getFeedbacksByProjectId,
);

router.get(
  '/:projectId/employee-checkins',
  employeeCheckInController.getCheckInsByProjectId,
);

const projectRouter = router;

export default projectRouter;
