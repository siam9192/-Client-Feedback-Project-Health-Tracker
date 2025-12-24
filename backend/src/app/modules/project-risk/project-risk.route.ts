import { Router } from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.interface';
import projectRiskController from './project-risk.controller';

const router = Router();
router.post('/', auth(UserRole.CLIENT), projectRiskController.createRisk);

router.get('/', auth(UserRole.CLIENT), projectRiskController.getRisks);

const projectRiskRouter = router;

export default projectRiskRouter;
