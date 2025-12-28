"use client";

import { useState, useMemo } from "react";
import { Project } from "@/types/project.type";
import ActivitiesDialog from "../sections/ActivitiesDialog";
import { formatEnumLabel, getProjectStatusColor } from "@/utils/helpers";
import ProjectDetailsDialog from "../sections/ProjectDetailsDialog";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [showActivities, setShowActivities] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const startDate = useMemo(() => new Date(project.startDate), [project.startDate]);
  const endDate = useMemo(() => new Date(project.endDate), [project.endDate]);
  const today = new Date();

  const hasStarted = startDate.getTime() <= today.getTime();

  const progress = hasStarted ? project.progressPercentage : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition border border-gray-100">
      {/* Header */}

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">{project.name}</h3>
        <p className="text-sm text-gray-500">Client: {project.client.name}</p>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-700">{progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all
            ${hasStarted ? "bg-indigo-600" : "bg-gray-400"}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {!hasStarted && (
          <p className="text-xs text-gray-400 mt-1">Progress will start after project begins</p>
        )}
      </div>
      <div className="flex justify-end">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide
          ${getProjectStatusColor(project.status)}`}
        >
          {formatEnumLabel(project.status)}
        </span>
      </div>
      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-500">Health Score</p>
          <p
            className={`font-semibold 
            ${getProjectStatusColor(project.status, { withBg: false })}`}
          >
            {project.healthScore}%
          </p>
        </div>

        <div>
          <p className="text-gray-500">{hasStarted ? "Deadline" : "Start Date"}</p>
          <p className="font-medium text-gray-700">
            {hasStarted ? endDate.toDateString() : startDate.toDateString()}
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-2">Team Members</p>
        <div className="flex flex-wrap gap-2">
          {project.employees.map((member) => (
            <span
              key={member._id}
              className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700"
            >
              {member.name}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 ">
        <button
          onClick={() => setShowActivities(true)}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
        >
          Activities
        </button>

        <button
          onClick={() => setShowDetails(true)}
          className="text-sm font-medium text-gray-600 hover:text-gray-800 transition"
        >
          View Project
        </button>
      </div>

      {showActivities && <ActivitiesDialog />}
      {showDetails ? (
        <ProjectDetailsDialog id={project._id} onClose={() => setShowDetails(false)} />
      ) : null}
    </div>
  );
}

export default ProjectCard;
