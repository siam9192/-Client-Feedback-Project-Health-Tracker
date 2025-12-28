import { ProjectStatus } from "@/types/project.type";
import { ProjectRiskSeverity, ProjectRiskStatus } from "@/types/risk.type";

type StatusColorOptions = {
  withBg?: boolean;
  withText?: boolean;
};

export function getProjectStatusColor(
  status: ProjectStatus,
  options: StatusColorOptions = { withBg: true, withText: true },
) {
  const { withBg = true, withText = true } = options;

  let bgClass = "";
  let textClass = "";

  switch (status) {
    case ProjectStatus.ON_TRACK:
      bgClass = "bg-green-100";
      textClass = "text-green-700";
      break;
    case ProjectStatus.AT_RISK:
      bgClass = "bg-yellow-100";
      textClass = "text-yellow-700";
      break;
    case ProjectStatus.CRITICAL:
      bgClass = "bg-red-100";
      textClass = "text-red-700";
      break;
    case ProjectStatus.COMPLETED:
      bgClass = "bg-blue-100";
      textClass = "text-blue-700";
      break;
    default:
      bgClass = "bg-gray-100";
      textClass = "text-gray-700";
  }

  return `${withBg ? bgClass : ""} ${withText ? textClass : ""}`.trim();
}
export function formatEnumLabel(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getTotalPages(total: number, limit: number) {
  return Math.floor(total / limit);
}

export function getRiskSeverityColor(
  severity: string,
  options: StatusColorOptions = { withBg: true, withText: true },
) {
  let bg = "";
  let text = "";

  switch (severity) {
    case ProjectRiskSeverity.HIGH:
      bg = "bg-red-100";
      text = "text-red-700";
      break;
    case ProjectRiskSeverity.MEDIUM:
      bg = "bg-orange-100";
      text = "text-orange-700";

      break;
    default:
      bg = "bg-green-100";
      text = "text-green-700";
  }

  return `${options.withBg ? bg : ""} ${options.withText ? text : ""}`.trim();
}

export function getRiskStatusColor(
  status: string,
  options: StatusColorOptions = { withBg: true, withText: true },
) {
  let bg = "";
  let text = "";

  switch (status) {
    case ProjectRiskStatus.RESOLVED:
      bg = "bg-green-100";
      text = "text-green-700";
      break;
    default:
      bg = "bg-blue-100";
      text = "text-blue-700";
  }

  return `${options.withBg ? bg : ""} ${options.withText ? text : ""}`.trim();
}
