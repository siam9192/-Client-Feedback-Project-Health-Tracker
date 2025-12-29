import { IRouter, Router } from 'express';
import userRouter from '../modules/user/user.route';
import authRouter from '../modules/auth/auth.router';
import projectRouter from '../modules/project/project.route';
import employeeCheckInRouter from '../modules/employee-checkIn/employee-checkIn.route';
import clientFeedbackRouter from '../modules/client-feedback/client-feedback.route';
import projectRiskRouter from '../modules/project-risk/project-risk.route';
import metadataRouter from '../modules/metadata/metdata.route';

type TModuleRoutes = { path: string; router: IRouter }[];
const router = Router();
const moduleRoutes: TModuleRoutes = [
  { path: '/auth', router: authRouter },
  { path: '/users', router: userRouter },
  { path: '/projects', router: projectRouter },
  { path: '/employee-checkins', router: employeeCheckInRouter },
  { path: '/client-feedbacks', router: clientFeedbackRouter },
  { path: '/project-risks', router: projectRiskRouter },
  { path: '/metadata', router: metadataRouter },
];

const routes = moduleRoutes.map((route) =>
  router.use(route.path, route.router),
);

export default routes;
