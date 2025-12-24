import { Router } from 'express';
import auth from '../../middlewares/auth';
import employeeCheckInController from './employee-checkIn.controller';
import { UserRole } from '../user/user.interface';

const router = Router();
router.post(
  '/',
  auth(UserRole.EMPLOYEE),
  employeeCheckInController.createCheckIn,
);

router.get(
  '/pending',
  auth(UserRole.EMPLOYEE),
  employeeCheckInController.getPendingCheckIns,
);

const employeeCheckInRouter = router;

export default employeeCheckInRouter;
