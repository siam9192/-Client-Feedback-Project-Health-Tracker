import { Router } from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.interface';
import clientFeedbackController from './client-feedback.controller';

const router = Router();
router.post(
  '/',
  auth(UserRole.CLIENT),
  clientFeedbackController.createFeedback,
);

router.get(
  '/latest',
  auth(UserRole.CLIENT),
  clientFeedbackController.getLatestFeedback,
);

const clientFeedbackRouter = router;

export default clientFeedbackRouter;
