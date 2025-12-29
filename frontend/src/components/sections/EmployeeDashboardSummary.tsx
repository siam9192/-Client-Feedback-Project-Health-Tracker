"use client";
import { DashboardSummary } from "@/types";
import DashboardSummaryCard from "../ui/MetadataCard";
import { FolderKanban, ClipboardCheck, AlertTriangle, BarChart3 } from "lucide-react";
import { IResponse } from "@/types/response.type";
import { getDashboardSummary } from "@/services/api/metadata.api.service";
import useQuery from "@/hooks/useQuery";
import { EmployeeDashboardSummary as TEmployeeDashboardSummary } from "@/types/metadata.type";

function EmployeeDashboardSummary() {
  const { data } = useQuery<IResponse<TEmployeeDashboardSummary>>("dashboard-summary", () =>
    getDashboardSummary(),
  );

  const mainData = data?.data;

  const summary: DashboardSummary[] = [
    {
      label: "Assigned Projects",
      value: mainData?.assignedProjects ?? 0,
      icon: FolderKanban,
    },
    {
      label: "Pending Check-ins",
      value: mainData?.pendingWeeklyCheckIns ?? 0,
      icon: ClipboardCheck,
    },
    {
      label: "Open Risks",
      value: mainData?.openRisks ?? 0,
      icon: AlertTriangle,
    },
    {
      label: "Avg Progress",
      value: (mainData?.avgProgress ?? 0) + "%",
      icon: BarChart3,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {summary.map((d) => (
          <DashboardSummaryCard key={d.label} data={d} />
        ))}
      </div>
    </div>
  );
}

export default EmployeeDashboardSummary;
