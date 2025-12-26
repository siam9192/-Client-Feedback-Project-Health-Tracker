interface HighRiskProject {
  name: string;
  projectManager: string;
  healthScore: number; // 0-100
  nextDeadline: string; // formatted date
  keyIssues: string[];
}

const highRiskProjects: HighRiskProject[] = [
  { 
    name: "Project Titan", 
    projectManager: "Siam Hasan", 
    healthScore: 32, 
    nextDeadline: "2025-12-28", 
    keyIssues: ["Delayed tasks", "Resource shortage"] 
  },
  { 
    name: "Project Vega", 
    projectManager: "Sara Khan", 
    healthScore: 28, 
    nextDeadline: "2025-12-30", 
    keyIssues: ["Unresolved bugs", "Missed milestones"] 
  },
  { 
    name: "Project Orion", 
    projectManager: "Rony", 
    healthScore: 40, 
    nextDeadline: "2026-01-05", 
    keyIssues: ["Low team engagement"] 
  },
];

export default function HighRiskProjects() {
  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        High-Risk Projects Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {highRiskProjects.map((project, idx) => (
          <div key={idx} className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-red-700 mb-2">{project.name}</h3>
            <p className="text-gray-700 mb-1"><span className="font-medium">Manager:</span> {project.projectManager}</p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Health Score:</span> 
              <span className="ml-1 font-bold text-red-600">{project.healthScore}%</span>
            </p>
            <p className="text-gray-700 mb-2"><span className="font-medium">Next Deadline:</span> {project.nextDeadline}</p>
            <div>
              <span className="font-medium text-gray-800">Key Issues:</span>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                {project.keyIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
