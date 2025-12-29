import { Router } from 'express';
import auth from '../../middlewares/auth';
import metadataController from './metadata.controller';

const router = Router();

router.get(
  '/dashboard-summary',
  auth(),
  metadataController.getDashboardSummary,
);

const metadataRouter = router;
export default metadataRouter;
