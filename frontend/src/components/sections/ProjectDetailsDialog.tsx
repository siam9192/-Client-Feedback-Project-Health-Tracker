import useQuery from "@/hooks/useQuery";
import { getProjectById } from "@/services/api/project.api.service";
import { Project } from "@/types/project.type";
import { IResponse } from "@/types/response.type";
import { DEFAULT_PROFILE_PICTURE } from "@/utils/constant";
import { formatEnumLabel, getProjectStatusColor } from "@/utils/helpers";
import { useEffect } from "react";

interface Props {
  id: string;
  onClose: () => void;
}

export default function ProjectDetailsDialog({ id, onClose }: Props) {
  const { data, isLoading, error } = useQuery<IResponse<Project>>(`project-details-${id}`, () =>
    getProjectById(id),
  );

  const project = data?.data;

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-indigo-600 mb-3" />
          <p className="text-sm text-gray-500">Loading project details…</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/60" onClick={onClose}>
        <div className="bg-white rounded-xl p-6 text-center shadow-lg" onClick={stopPropagation}>
          <p className="text-red-500 text-sm mb-3">Failed to load project information</p>
          <button onClick={onClose} className="text-xs underline text-gray-500">
            Close
          </button>
        </div>
      </div>
    );
  }

  const progress = project.progressPercentage ?? 0;
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const hasStarted = new Date() >= startDate;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3"
      onClick={onClose}
    >
      <div
        onClick={stopPropagation}
        className="
          w-full max-w-2xl max-h-[85vh]
          bg-white rounded-2xl shadow-2xl
          overflow-y-auto relative
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
              ${getProjectStatusColor(project.status)}`}
            >
              {formatEnumLabel(project.status)}
            </span>
          </div>

          {/* Description */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="font-semibold text-gray-700">{progress}%</span>
            </div>

            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 rounded-full
                ${hasStarted ? "bg-gradient-to-r from-indigo-500 to-indigo-700" : "bg-gray-400"}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{startDate.toDateString()}</span>
              <span>{endDate.toDateString()}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Health Score</p>
              <p
                className={`text-lg font-bold
                ${getProjectStatusColor(project.status, {
                  withBg: false,
                })}`}
              >
                {project.healthScore}%
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">{hasStarted ? "Deadline" : "Start Date"}</p>
              <p className="text-sm font-semibold text-gray-800">
                {hasStarted ? endDate.toDateString() : startDate.toDateString()}
              </p>
            </div>
          </div>

          {/* Team */}
          <div>
            <p className="text-sm text-gray-500 mb-3">Assigned To</p>

            <div className="flex flex-wrap gap-4">
              {/* Client */}
              <TeamAvatar name={project.client.name} picture={project.client.profilePicture} role="Client" highlight />

              {/* Employees */}
              {project.employees.map((emp) => (
                <TeamAvatar key={emp._id} name={emp.name} picture={emp.profilePicture} role="Employee" />
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-primary rounded-lg text-primary-content font-medium hover:bg-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamAvatar({
  name,
  picture,
  role,
  highlight,
}: {
  name: string;
  picture?:string
  role: string;
  highlight?: boolean;
  
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <img
        src={picture??DEFAULT_PROFILE_PICTURE}
        className={`size-10 rounded-full ring-2 ${highlight ? "ring-indigo-500" : "ring-gray-300"}`}
        alt=""
      />
      <span className="text-xs font-medium text-gray-700">{name}</span>
      <span className="text-[10px] text-gray-400">{role}</span>
    </div>
  );
}
