import PageHeading from "@/components/ui/PageHeading";
import ProjectCard from "@/components/ui/ProjectCard";

function page() {
  return (
   
      <div >
        <PageHeading
          title="Projects Health Group"
          subtitle="Projects categorized by current health status"
        />

        {/* HEALTHY PROJECTS */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold  mb-4">
            Healthy Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCard key={`healthy-${index}`} />
            ))}
          </div>
        </section>

        {/* AT RISK PROJECTS */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold  mb-4">
            At Risk Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 7 }).map((_, index) => (
              <ProjectCard key={`risk-${index}`} />
            ))}
          </div>
        </section>

        {/* CRITICAL PROJECTS */}
        <section>
          <h2 className="text-lg font-semibold  mb-4">
            Critical Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 7 }).map((_, index) => (
              <ProjectCard key={`critical-${index}`} />
            ))}
          </div>
        </section>

      </div>
    
  );
}

export default page;
