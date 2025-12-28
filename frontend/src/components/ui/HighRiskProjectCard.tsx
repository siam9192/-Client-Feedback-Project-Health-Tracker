"use client";

import React from "react";
import { HighRiskProject } from "@/types/project.type";
import { formatDistanceToNow, parseISO } from "date-fns";

type Props = {
  project: HighRiskProject;
};

const HighRiskProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-red-700 mb-2">{project.name}</h3>

      {/* Client */}
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Client:</span> {project.client.name}
      </p>

      {/* Status */}
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Status:</span>{" "}
        {project.status.replace("_", " ").toUpperCase()}
      </p>

      {/* Health Score */}
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Health Score:</span>{" "}
        <span className="ml-1 font-bold text-red-600">{project.healthScore}%</span>
      </p>

      {/* Deadline */}
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Deadline:</span>{" "}
        {project.endDate
          ? formatDistanceToNow(parseISO(project.endDate), { addSuffix: true })
          : "N/A"}
      </p>

      {/* Summary */}
      <div>
        <span className="font-medium text-gray-800">Summary:</span>
        <ul className="list-disc list-inside text-gray-700 mt-1">
          <li>Submitted Check-ins: {project.summary.submittedEmployeeCheckins}</li>
          <li>Missing Check-ins: {project.summary.missingEmployeeCheckins}</li>
          <li>Open Risks: {project.summary.openRisks}</li>
          <li>Flagged Issues: {project.summary.flaggedIssues}</li>
          <li>Complete Percentage: {project.progressPercentage}%</li>
        </ul>
      </div>
    </div>
  );
};

export default HighRiskProjectCard;
