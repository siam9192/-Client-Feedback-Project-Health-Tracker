"use client";
import { DashboardSummary } from "@/types";
import DashboardSummaryCard from "../ui/MetadataCard";
import { FolderKanban, Activity, MessageSquareWarning, HeartPulse } from "lucide-react";
import { IResponse } from "@/types/response.type";
import { getDashboardSummary } from "@/services/api/metadata.api.service";
import useQuery from "@/hooks/useQuery";
import { ClientDashboardSummary as TClientDashboardSummary } from "@/types/metadata.type";
import { formatEnumLabel } from "@/utils/helpers";

function ClientDashboardSummary() {
  const { data } = useQuery<IResponse<TClientDashboardSummary>>("dashboard-summary", () =>
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
      label: "Active Projects",
      value: mainData?.activeProjects ?? 0,
      icon: Activity,
    },
    {
      label: "Pending Feedbacks",
      value: mainData?.pendingWeeklyFeedbacks ?? 0,
      icon: MessageSquareWarning,
    },
    {
      label: "Health Status",
      value: formatEnumLabel(mainData?.currentHealthStatus ?? ""),
      icon: HeartPulse,
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

export default ClientDashboardSummary;
