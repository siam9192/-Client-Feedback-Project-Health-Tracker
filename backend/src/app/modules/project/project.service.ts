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

 
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const now = Date.now();

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = now - startDate.getTime();

  const availableDurationPercentage =
    elapsed > 0 ? clamp((elapsed / totalDuration) * 100) : 0;

  const projectStartWeek = getISOweekYear(startDate);
  const currentWeek = getCurrentWeek();
  const recentWeeks = getRecentWeeks(2);

  const isProjectStartedThisWeek =
    currentWeek.week === projectStartWeek.week &&
    currentWeek.year === projectStartWeek.year;

  //  CLIENT SATISFACTION 
  const recentFeedbacks = await ClientFeedbackModel.find({
    project: projectId,
    $or: recentWeeks.map((w) => ({ week: w.week, year: w.year })),
  }).sort({ createdAt: -1 });

  let clientPoints = 100;

  if (recentFeedbacks.length === 0) {
    const totalFeedbacks = await ClientFeedbackModel.countDocuments({
      project: projectId,
    });

    if (totalFeedbacks === 0 && isProjectStartedThisWeek) {
      clientPoints = 0; // Too early, no feedback expected
    } else {
      clientPoints = 50; // No recent feedback penalty
    }
  } else {
    const avgRating =
      recentFeedbacks.reduce(
        (acc, curr) => acc + curr.satisfactionRating,
        0,
      ) / recentFeedbacks.length;

    clientPoints = (avgRating / 5) * 100;
  }

  clientPoints = clamp(clientPoints);

  // EMPLOYEE CONFIDENCE 
  const recentCheckins = await EmployeeCheckInModel.find({
    project: projectId,
    $or: recentWeeks.map((w) => ({ week: w.week, year: w.year })),
  });

  let employeePoints = 100;

  if (recentCheckins.length > 0) {
    const avgConfidence =
      recentCheckins.reduce(
        (acc, curr) => acc + curr.confidenceLevel,
        0,
      ) / recentCheckins.length;

    employeePoints = (avgConfidence / 5) * 100;
  } else {
    const totalCheckins = await EmployeeCheckInModel.countDocuments({
      project: projectId,
    });

    if (totalCheckins === 0 && !isProjectStartedThisWeek) {
      employeePoints = 0;
    } else {
      employeePoints = 50;
    }
  }

  employeePoints = clamp(employeePoints);

  // PROJECT PROGRESS 
  let expectedProgress = availableDurationPercentage;
  if (elapsed < 0) expectedProgress = 0;

  const actualProgress = project.progressPercentage || 0;

  let progressPoints = 100;
  if (actualProgress < expectedProgress) {
    progressPoints = 100 - (expectedProgress - actualProgress) * 2;
  }

  progressPoints = clamp(progressPoints);

  //  RISKS & ISSUES 
  const activeRisks = await ProjectRiskModel.find({
    project: projectId,
    status: ProjectRiskStatus.OPEN,
  });

  const activeIssues = await ClientFeedbackModel.find({
    project: projectId,
    issueFlagged: true,
  });

  let riskPoints = 100;

  for (const risk of activeRisks) {
    if (risk.severity === ProjectRiskSeverity.HIGH) riskPoints -= 15;
    if (risk.severity === ProjectRiskSeverity.MEDIUM) riskPoints -= 10;
    if (risk.severity === ProjectRiskSeverity.LOW) riskPoints -= 5;
  }

  riskPoints -= activeIssues.length * 5;

  // Extra penalty if deadline is so close and have too much risk and issues
  if (riskPoints <= 20 && availableDurationPercentage <= 10) {
    riskPoints -= 20;
  }

  riskPoints = clamp(riskPoints);

  //  FINAL CALCULATION 
  const finalScore = Math.round(
      clientPoints * 0.3 +
      employeePoints * 0.2 +
      progressPoints * 0.25 +
      riskPoints * 0.25,
  );

  // SET NEW STATUS 
  const newStatus = getProjectHealthStatus(finalScore)

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
