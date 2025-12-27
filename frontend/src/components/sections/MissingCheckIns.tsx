interface ProjectCheckIn {
  name: string;
  projectManager: string;
  client: string;
  teamMembers: string[];
  status: "On Track" | "At Risk" | "Critical";
  completion: number; // 0 - 100%
  lastCheckIn: string; // ISO date or formatted string
  daysSinceLastCheckIn: number;
}

const missingCheckIns: ProjectCheckIn[] = [
  {
    name: "Project Apollo",
    projectManager: "Arafat Hasan",
    client: "Client A",
    teamMembers: ["Rony", "Siam Hasan", "Sara Khan"],
    status: "At Risk",
    completion: 65,
    lastCheckIn: "2025-12-20",
    daysSinceLastCheckIn: 6,
  },
  {
    name: "Project Orion",
    projectManager: "Rony",
    client: "Client B",
    teamMembers: ["Arafat Hasan", "Sara Khan"],
    status: "Critical",
    completion: 42,
    lastCheckIn: "2025-12-18",
    daysSinceLastCheckIn: 8,
  },
  {
    name: "Project Titan",
    projectManager: "Siam Hasan",
    client: "Client C",
    teamMembers: ["Rony", "Sara Khan"],
    status: "At Risk",
    completion: 58,
    lastCheckIn: "2025-12-19",
    daysSinceLastCheckIn: 7,
  },
  {
    name: "Project Vega",
    projectManager: "Sara Khan",
    client: "Client D",
    teamMembers: ["Arafat Hasan", "Siam Hasan", "Rony"],
    status: "Critical",
    completion: 35,
    lastCheckIn: "2025-12-15",
    daysSinceLastCheckIn: 11,
  },
];

export default function MissingCheckIns() {
  return (
    <div className="bg-white shadow rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Projects Missing Recent Check-ins
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Project Name</th>
            
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Client</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Team Members</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Completion</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Last Check-in</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Days Since Last Check-in</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-secondary">
            {missingCheckIns.map((project, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700 font-medium">{project.name}</td>
        
                <td className="px-4 py-2 text-gray-700">{project.client}</td>
                <td className="px-4 py-2 text-gray-700">
                  {project.teamMembers.join(", ")}
                </td>
                <td className={`px-4 py-2 font-semibold ${
                  project.status === "Critical"
                    ? "text-red-600"
                    : project.status === "At Risk"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}>
                  {project.status}
                </td>
                <td className="px-4 py-2">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        project.completion > 80
                          ? "bg-green-500"
                          : project.completion > 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-700">{project.completion}%</span>
                </td>
                <td className="px-4 py-2 text-gray-500">{project.lastCheckIn}</td>
                <td className={`px-4 py-2 font-semibold ${
                  project.daysSinceLastCheckIn > 7 ? "text-red-600" : "text-yellow-600"
                }`}>
                  {project.daysSinceLastCheckIn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
