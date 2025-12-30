import AppError from '../../errors/AppError';
import httpStatus from '../../utils/http-status';
import { User, UserRole, UserStatus } from '../user/user.interface';
import { ClientModel, EmployeeModel } from '../user/user.model';
import {
  CreateProjectPayload,
  Project,
  ProjectsFilterQuery,
  ProjectStatus,
} from './project.interface';
import projectValidations from './project.validation';

import { ProjectModel } from './project.model';
import {
  getCurrentWeek,
  getISOweekYear,
  getProjectHealthStatus,
  getRecentWeeks,
  getWeeksBetweenDates,
  hasStarted,
  objectId,
} from '../../helpers/utils.helper';
import { PaginationOptions } from '../../types';
import { calculatePagination } from '../../helpers/pagination.helper';
import { AuthUser } from '../auth/auth.interface';
import { ClientFeedbackModel } from '../client-feedback/client-feedback.model';
import { EmployeeCheckInModel } from '../employee-checkIn/employee-checkIn.model';
import { ProjectRiskModel } from '../project-risk/project-risk.model';
import {
  ProjectRiskSeverity,
  ProjectRiskStatus,
} from '../project-risk/project-risk.interface';
import activityService from '../activity/activity.service';
import {
  ActivityPerformerRole,
  ActivityType,
} from '../activity/activity.interface';

class ProjectService {
  async createProject(payload: CreateProjectPayload) {
    //  Validate payload
    payload = projectValidations.createProjectSchema.parse(payload);

    const { employeeIds, clientId, ...othersData } = payload;

    //  Fetch client
    const client = await ClientModel.findById(clientId).populate({
      path: 'user',
      select: 'status',
    });

    if (!client) {
      throw new AppError(httpStatus.NOT_FOUND, 'Client not found');
    }

    if ((client.user as any as User)?.status === UserStatus.BLOCKED) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Project assignment is not allowed for blocked clients',
      );
    }

    //  Fetch employees
    const employeeObjectIds = employeeIds.map((id) => objectId(id));

    const employees = await EmployeeModel.find({
      _id: { $in: employeeObjectIds },
    }).populate({
      path: 'user',
      select: 'status',
    });

    //  Validate employee
    if (employees.length !== employeeIds.length) {
      const foundIds = new Set(employees.map((e) => e._id.toString()));
      const missingId = employeeIds.find((id) => !foundIds.has(id));
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Employee not found: ${missingId}`,
      );
    }

    for (const employee of employees) {
      if ((employee.user as any as User)?.status === UserStatus.BLOCKED) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          `Project assignment not allowed for blocked employee: ${employee._id}`,
        );
      }
    }

    // Create project
    return await ProjectModel.create({
      client: clientId,
      ...othersData,
      employees: employeeIds.map((id) => objectId(id)),
    });
  }

  async updateProjectHealthScore(id: string) {
   const projectId = objectId(id);
   const project = await ProjectModel.findById(projectId);
   if (!project) return;

  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const now = Date.now();
  const startDate = new Date(project.startDate).getTime();
  const endDate = new Date(project.endDate).getTime();

  //  Run all DB queries in parallel for speed
  const recentWeeks = getRecentWeeks(2);
  const weekFilter = { $or: recentWeeks.map((w) => ({ week: w.week, year: w.year })) };

  const [recentFeedbacks, totalFeedbacksCount, recentCheckins, totalCheckinsCount, activeRisks, activeIssues] = await Promise.all([
    ClientFeedbackModel.find({ project: projectId, ...weekFilter }).sort({ createdAt: -1 }),
    ClientFeedbackModel.countDocuments({ project: projectId }),
    EmployeeCheckInModel.find({ project: projectId, ...weekFilter }),
    EmployeeCheckInModel.countDocuments({ project: projectId }),
    ProjectRiskModel.find({ project: projectId, status: ProjectRiskStatus.OPEN }),
    ClientFeedbackModel.find({ project: projectId, issueFlagged: true }),
  ]);

  //  Logic helpers
  const isNew = getCurrentWeek().week === getISOweekYear(new Date(startDate)).week;

  const calculateMetric = (recent: any[], total: number, key: string) => {
    if (recent.length > 0) {
      const avg = recent.reduce((acc, curr) => acc + curr[key], 0) / recent.length;
      return (avg / 5) * 100;
    }
    return isNew ? 100 : total === 0 ? 0 : 50;
  };

  //  Score Calculations
  const clientPoints = clamp(calculateMetric(recentFeedbacks, totalFeedbacksCount, 'satisfactionRating'));
  const employeePoints = clamp(calculateMetric(recentCheckins, totalCheckinsCount, 'confidenceLevel'));

  // Progress Points
  const totalDuration = endDate - startDate;
  const elapsed = now - startDate;
  const expectedProgress = totalDuration > 0 ? clamp((elapsed / totalDuration) * 100) : 100;
  const actualProgress = project.progressPercentage || 0;
  let progressPoints = clamp(actualProgress < expectedProgress ? 100 - (expectedProgress - actualProgress) * 2 : 100);

  // Risk Points
  let riskPoints = 100;
  activeRisks.forEach(risk => {
    if (risk.severity === ProjectRiskSeverity.HIGH) riskPoints -= 15;
    else if (risk.severity === ProjectRiskSeverity.MEDIUM) riskPoints -= 10;
    else riskPoints -= 5;
  });

  riskPoints -= (activeIssues.length * 5);
  if (riskPoints <= 20 && expectedProgress >= 90) riskPoints -= 20; // Critical near deadline

  //  Final Calculation
  const finalScore = Math.round(
    clientPoints * 0.3 +
    employeePoints * 0.25 +
    progressPoints * 0.25 +
    riskPoints * 0.20
  );


  // Set new status
   const newStatus = getProjectHealthStatus(finalScore);

    const oldStatus = project.status;

    project.healthScore = finalScore;

    if (oldStatus !== newStatus) {
      project.status = newStatus;

      await activityService.createDirectActivity(
        {
          projectId: project._id.toString(),
          referenceId: project._id.toString(),
          type: ActivityType.STATUS_CHANGE,
          content: `Project status automatically shifted from ${oldStatus} to ${newStatus} (Health Score: ${finalScore})`,
          performerRole: ActivityPerformerRole.SYSTEM,
        },
        false,
      );
    }

    await project.save();
    return finalScore;
  }

  async getAssignedProjects(
    authUser: AuthUser,
    filterQuery: ProjectsFilterQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { page, skip, limit, sortBy, sortOrder } =
      calculatePagination(paginationOptions);

    const { searchTerm, ...filters } = filterQuery;

    const whereConditions: Record<string, any> = {};

    // Role-based assignment
    if (authUser.role === UserRole.CLIENT) {
      whereConditions.client = authUser.profileId;
    } else {
      whereConditions.employees = authUser.profileId;
    }

    // Search
    if (searchTerm?.trim()) {
      whereConditions.name = { $regex: searchTerm, $options: 'i' };
    }

    // Other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value != null) whereConditions[key] = value;
    });

    const projects = await ProjectModel.find(whereConditions)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate([
        { path: 'client', select: '_id name profilePicture' },
        { path: 'employees', select: '_id name profilePicture' },
      ])
      .lean()
      .exec();

    const { week, year } = getCurrentWeek();
    const isEmployee = authUser.role === UserRole.EMPLOYEE;

    // Started projects only
    const startedProjectIds = projects
      .filter((p) => hasStarted(p.startDate))
      .map((p) => p._id);

    // Fetch submissions feedbacks
    const submissions = isEmployee
      ? await EmployeeCheckInModel.find({
          project: { $in: startedProjectIds },
          employee: objectId(authUser.profileId),
          week,
          year,
        }).select('project')
      : await ClientFeedbackModel.find({
          project: { $in: startedProjectIds },
          client: objectId(authUser.profileId),
          week,
          year,
        }).select('project');

    const submittedProjectIdSet = new Set(
      submissions.map((s) => s.project.toString()),
    );

    // Attach pending flags
    const data = projects.map((project) => {
      const isPending =
        !submittedProjectIdSet.has(project._id.toString()) &&
        hasStarted(project.startDate);

      return {
        ...project,
        ...(isEmployee
          ? { checkinPending: isPending }
          : { feedbackPending: isPending }),
      };
    });

    const totalResults = await ProjectModel.countDocuments(whereConditions);

    return {
      data,
      meta: {
        page,
        limit,
        totalResults,
      },
    };
  }

  async getAllGroupProjectsByHealthStatus() {
    //  Group active projects by status
    const groups = await ProjectModel.aggregate([
      {
        $project: {
          name: 1,
          status: 1,
          client: 1,
          employees: 1,
          startDate: 1,
          endDate: 1,
          healthStatus: 1,
          healthScore: 1,
          progressPercentage: 1,
        },
      },
      {
        $group: {
          _id: '$status',
          projects: { $push: '$$ROOT' },
        },
      },
    ]);

    //  Collect unique client & employee IDs
    const clientIds = new Set<string>();
    const employeeIds = new Set<string>();

    groups.forEach(({ projects }) => {
      projects.forEach((project: Project) => {
        if (project.client) clientIds.add(project.client.toString());
        project.employees?.forEach((id) => employeeIds.add(id.toString()));
      });
    });

    //  Fetch related users in parallel
    const [clients, employees] = await Promise.all([
      ClientModel.find({ _id: { $in: [...clientIds] } })
        .select('_id name profilePicture')
        .lean(),
      EmployeeModel.find({ _id: { $in: [...employeeIds] } })
        .select('_id name profilePicture')
        .lean(),
    ]);

    //  Build lookup maps
    const clientMap = new Map(
      clients.map((client) => [client._id.toString(), client]),
    );

    const employeeMap = new Map(
      employees.map((emp) => [emp._id.toString(), emp]),
    );

    return groups.map(({ _id: status, projects }) => ({
      status,
      projects: projects.map((project: Project) => ({
        ...project,
        client: project.client
          ? clientMap.get(project.client.toString()) || null
          : null,
        employees:
          project.employees
            ?.map((id) => employeeMap.get(id.toString()))
            .filter(Boolean) ?? [],
      })),
    }));
  }

  async getProjectById(authUser: AuthUser, id: string) {
    // Fetch project
    const project = await ProjectModel.findById(id).populate([
      {
        path: 'employees',
        select: '_id name profilePicture',
      },
      {
        path: 'client', // Assuming you have a client field
        select: '_id name companyName profilePicture',
      },
    ]);

    if (!project) throw new AppError(httpStatus.NOT_FOUND, 'Project not found');

    //  Authorization
    if (authUser.role === UserRole.EMPLOYEE) {
      const isAssigned = project.employees.some(
        (emp) => emp._id.toString() === authUser.profileId,
      );
      if (!isAssigned) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'You are not assigned to this project',
        );
      }
    } else if (authUser.role === UserRole.CLIENT) {
      // Check if the client owns this project
      if (project.client?._id.toString() !== authUser.profileId) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'You do not have access to this project',
        );
      }
    }

    // Return project as result
    return project;
  }

  async getHighRiskProjectsWithSummary(paginationOptions: PaginationOptions) {
    const { page, limit, skip } = calculatePagination(paginationOptions);
    const highRiskThreshold = 60;

    const whereConditions = {
      status: { $ne: ProjectStatus.COMPLETED },
      healthScore: { $lt: highRiskThreshold },
    };

    const projects = await ProjectModel.find(whereConditions)
      .select(
        '_id name client employees status progressPercentage healthScore endDate startDate',
      )
      .populate('client', '_id name profilePicture')
      .sort({ healthScore: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const data = await Promise.all(
      projects.map(async (project) => {
        const weeks = getWeeksBetweenDates(
          new Date(project.startDate),
          new Date(),
        );

        const totalWeeksCount = Math.max(0, weeks.length - 1);

        const expectedEmployeeCheckIns =
          totalWeeksCount * project.employees.length;

        const [
          submittedEmployeeCheckins,
          submittedClientFeedbacks,
          openRisks,
          flaggedIssues,
        ] = await Promise.all([
          EmployeeCheckInModel.countDocuments({ project: project._id }),
          ClientFeedbackModel.countDocuments({ project: project._id }),
          ProjectRiskModel.countDocuments({
            project: project._id,
            status: ProjectRiskStatus.OPEN,
          }),
          ClientFeedbackModel.countDocuments({
            project: project._id,
            isFlagged: true,
          }),
        ]);

        return {
          ...project,
          summary: {
            submittedEmployeeCheckins,
            expectedEmployeeCheckIns,
            missingEmployeeCheckins: Math.max(
              0,
              expectedEmployeeCheckIns - submittedEmployeeCheckins,
            ),
            submittedClientFeedbacks,
            openRisks,
            flaggedIssues,
          },
        };
      }),
    );

    const totalResults = await ProjectModel.countDocuments(whereConditions);

    return {
      data,
      meta: { page, limit, totalResults },
    };
  }

  async getRecentCheckinMissingProjects(paginationOptions: PaginationOptions) {
    const { page, limit, skip } = calculatePagination(paginationOptions);
    const today = new Date();
    const recentDate = new Date(today.toDateString());

    recentDate.setDate(recentDate.getDate() - 14);

    const whereConditions = {
      startDate: {
        $lte: today,
      },
      $or: [
        {
          lastCheckInAt: {
            $exists: false,
          },
        },
        {
          lastCheckInAt: {
            $lte: recentDate,
          },
        },
      ],
    };
    const data = await ProjectModel.find(whereConditions)
      .populate([
        {
          path: 'client',
          select: '_id name profilePicture',
        },
        {
          path: 'employees',
          select: '_id name profilePicture',
        },
      ])
      .skip(skip)
      .limit(limit);

    const totalResults = await ProjectModel.countDocuments(whereConditions);

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
export default new ProjectService();
