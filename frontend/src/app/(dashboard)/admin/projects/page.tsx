"use client";

import PageHeading from "@/components/ui/PageHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectCardSkeleton from "@/components/ui/ProjectCardSkeleton";
import useQuery from "@/hooks/useQuery";
import { getProjectHealthGroups } from "@/services/api/project.api.service";
import { ProjectHealthGroups, ProjectStatus } from "@/types/project.type";
import { IResponse } from "@/types/response.type";

function Page() {
  const { data, isLoading } = useQuery<IResponse<ProjectHealthGroups>>(
    "project-health-groups",
    () => getProjectHealthGroups(),
  );

  const groups = data?.data ?? [];

  const onTrackProjects = groups.find((g) => g.status === ProjectStatus.ON_TRACK)?.projects ?? [];
  const atRiskProjects = groups.find((g) => g.status === ProjectStatus.AT_RISK)?.projects ?? [];
  const criticalProjects = groups.find((g) => g.status === ProjectStatus.CRITICAL)?.projects ?? [];

  const renderProjects = (projectsArray: typeof onTrackProjects, skeletonCount = 4) => {
    if (isLoading) {
      return Array.from({ length: skeletonCount }).map((_, idx) => (
        <ProjectCardSkeleton key={idx} />
      ));
    }
    if (projectsArray.length === 0) {
      return <p className="text-gray-500 col-span-full text-center">No projects</p>;
    }
    return projectsArray.map((project) => <ProjectCard key={project._id} project={project} />);
  };

  return (
    <div>
      <PageHeading
        title="Projects Health Group"
        subtitle="Projects categorized by current health status"
      />

      {/* Healthy Projects */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Healthy Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {renderProjects(onTrackProjects, 6)}
        </div>
      </section>

      {/* At Risk Projects */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">At Risk Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {renderProjects(atRiskProjects, 4)}
        </div>
      </section>

      {/* Critical Projects */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Critical Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {renderProjects(criticalProjects, 4)}
        </div>
      </section>
    </div>
  );
}

export default Page;
