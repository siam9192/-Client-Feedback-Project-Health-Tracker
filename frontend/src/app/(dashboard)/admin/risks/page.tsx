"use client";

import RiskCard from "@/components/ui/RiskCard";
import RiskCardSkeleton from "@/components/ui/RiskCardSkeleton";
import useQuery from "@/hooks/useQuery";
import { getRisks } from "@/services/api/risk.api.service";
import { IResponse } from "@/types/response.type";
import { ProjectRisk } from "@/types/risk.type";
import { useState } from "react";
import Pagination from "@/components/ui/Pagination";
import { getTotalPages } from "@/utils/helpers";

export default function ProjectRisksPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery<IResponse<ProjectRisk[]>>("risks", () =>
    getRisks({ page }),
  );

  const risks = data?.data ?? [];
  const meta = data?.meta;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Project Risks</h1>
        <p className="text-sm text-gray-500">Track, assess, and mitigate project risks</p>
      </div>

      {/* Risks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[200px]">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => <RiskCardSkeleton key={index} />)
        ) : meta?.totalResults?? 0 > 0 ? (
          risks.map((risk) => <RiskCard key={risk._id} risk={risk} />)
        ) : (
          <div className="col-span-full text-center text-gray-400 py-20">
            No risks found for this project.
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta && risks.length > 0 && (
        <Pagination
          page={page}
          totalPages={getTotalPages(meta.totalResults, meta?.limit)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
