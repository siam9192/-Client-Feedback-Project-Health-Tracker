import {
  getCurrentWeek,
  getProjectHealthStatus,
  objectId,
} from '../../helpers/utils.helper';
import { AuthUser } from '../auth/auth.interface';
import { ClientFeedbackModel } from '../client-feedback/client-feedback.model';
import { EmployeeCheckInModel } from '../employee-checkIn/employee-checkIn.model';
import { ProjectRiskStatus } from '../project-risk/project-risk.interface';
import { ProjectRiskModel } from '../project-risk/project-risk.model';
import { ProjectStatus } from '../project/project.interface';
import { ProjectModel } from '../project/project.model';
import { UserModel } from '../user/user.model';

class MetadataService {
  async getAdminDashboardSummary() {
    const users = await UserModel.countDocuments();
    const activeProjects = await ProjectModel.countDocuments({
      status: {
        $ne: ProjectStatus.COMPLETED,
      },
      startDate: {
        $lte: new Date(),
      },
    });
    const pendingProjects = await ProjectModel.countDocuments({
      startDate: {
        $gt: new Date(),
      },
    });
    const highRiskProjects = await ProjectModel.countDocuments({
      healthScore: {
        $lt: 60,
      },
    });

    return {
      users,
      activeProjects,
      pendingProjects,
      highRiskProjects,
    };
  }

  async getEmployeeDashboardSummary(authUser: AuthUser) {
    const employeeId = objectId(authUser.profileId);
    const { week, year } = getCurrentWeek();
    const today = new Date();

    //  Assigned projects (active only)
    const assignedProjects = await ProjectModel.find({
      employees: employeeId,
      status: { $ne: ProjectStatus.COMPLETED },
    })
      .select('_id name startDate endDate progressPercentage')
      .lean();

    // Filter projects that have already started
    const startedProjects = assignedProjects.filter(
      (p) => new Date(p.startDate).getTime() <= today.getTime(),
    );

    const startedProjectIds = startedProjects.map((p) => p._id);

    //  Pending weekly check-ins
    const weeklyCheckins = await EmployeeCheckInModel.find({
      employee: employeeId,
      project: { $in: startedProjectIds },
      week,
      year,
    }).select('project');

    const submittedProjectSet = new Set(
      weeklyCheckins.map((c) => c.project.toString()),
    );

    const pendingWeeklyCheckIns = startedProjects.filter(
      (p) => !submittedProjectSet.has(p._id.toString()),
    ).length;

    const openRisks = await ProjectRiskModel.countDocuments({
      project: { $in: startedProjectIds },
      status: ProjectRiskStatus.OPEN,
    });

    // Average progress of current active projects
    const [avgProgressResult] = await ProjectModel.aggregate([
      {
        $match: {
          employees: employeeId,
          startDate: {
            $lte: new Date(),
          },
          status: {
            $ne: ProjectStatus.COMPLETED,
          },
        },
      },
      {
        $group: {
          _id: null,
          avgProgress: { $avg: '$progressPercentage' },
        },
      },
    ]);

    return {
      assignedProjects: assignedProjects.length,
      pendingWeeklyCheckIns,
      openRisks,
      avgProgress: parseFloat(avgProgressResult?.avgProgress ?? 0).toFixed(2),
    };
  }

  async getClientDashboardSummary(authUser: AuthUser) {
    const clientId = objectId(authUser.profileId);
  
    const assignedProjects = await ProjectModel.countDocuments({
      client: clientId,
    });
    const activeProjects = await ProjectModel.find({
      client: clientId,
      status: {
        $ne: ProjectStatus.COMPLETED,
      },
      startDate: {
        $lte: new Date(),
      },
    }).select('_id');

    // Count current week submitted feedbacks
    const weeklyFeedbacks = await ClientFeedbackModel.countDocuments({
      project: {
        $in: activeProjects.map((_) => _._id),
      },
    });

    const pendingWeeklyFeedbacks = Math.max(
      0,
      activeProjects.length - weeklyFeedbacks,
    );

    // // Average health of current active projects
    const avrHealth = await ProjectModel.aggregate([
      {
        $match: {
          clientId: clientId,
          status: { $ne: ProjectStatus.COMPLETED },
        },
      },
      {
        $group: {
          _id: null,
          averageHealth: { $avg: '$healthScore' },
        },
      },
    ]).exec();

    const currentHealthStatus = getProjectHealthStatus(
      avrHealth.length > 0 ? avrHealth[0].averageHealth : 0,
    );

    return {
      assignedProjects,
      activeProjects: activeProjects.length,
      currentHealthStatus,
      pendingWeeklyFeedbacks,
    };
  }
}

export default new MetadataService();
