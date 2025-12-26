'use client'
import { useState } from "react";
import ActivitiesDialog from "../sections/ActivitiesDialog";

const fakeProject = {
  name: "Project Apollo",
  description: "Building a scalable project management platform for enterprise clients.",
  startDate: new Date("2025-10-01"),
  endDate: new Date("2026-02-15"),
  status: "At Risk",
  progressPercentage: 62,
  healthScore: 48,
  createdAt: new Date(),
  updatedAt: new Date(),
  client: {
    _id: "87647y4he3",
    name: "TechNova Ltd",
  },
  employees: [
    { _id: "87647y4he3", name: "Arafat Hasan" },
    { _id: "87647y4he3", name: "Rony" },
    { _id: "87647y4he3", name: "Sara Khan" },
  ],
};

function ProjectCard() {
  const project = fakeProject;
  const [showActivities,setShowActivities] = useState(false)
  const statusColor =
    project.status === "Critical"
      ? "text-red-600 bg-red-50"
      : project.status === "At Risk"
      ? "text-yellow-600 bg-yellow-50"
      : "text-green-600 bg-green-50";

  const healthColor =
    project.healthScore < 40
      ? "text-red-600"
      : project.healthScore < 70
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition font-secondary">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 font-primary">
        <div >
          <h3 className="text-lg font-semibold text-gray-800">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500">
            Client: {project.client.name}
          </p>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-secondary">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{project.progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${project.progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-500">Health Score</p>
          <p className={`font-semibold ${healthColor}`}>
            {project.healthScore}%
          </p>
        </div>

        <div>
          <p className="text-gray-500">Deadline</p>
          <p className="font-medium text-gray-700">
            {project.endDate.toDateString()}
          </p>
        </div>
      </div>

      {/* Team */}
      <div>
        <p className="text-gray-500 text-sm mb-1">Team Members</p>
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
     <div className="mt-3 flex items-center justify-end gap-2  rounded-xl">
        <button onClick={()=>setShowActivities(true)} className=" text-sm font-medium rounded-lg text-secondary  transition hover:text-primary">
   Activities
  </button>
  <button className=" text-sm font-medium rounded-lg text-gray-600  hover:text-primary transition">
   View Project
  </button>
</div>  
{
    showActivities  ? 
    <ActivitiesDialog/>
    :
    null
}
    </div>
  );
}

export default ProjectCard;
