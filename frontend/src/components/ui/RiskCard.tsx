import React from 'react'
const risk = {
    id: "risk-001",
    title: "API performance degradation",
    severity: "High",
    mitigationPlan: "Optimize queries and add caching layer",
    status: "In Progress",
    project: "proj-101",
    employee: "emp-21",
    resolvedAt: "2025-12-20",
    createdAt: "2025-12-20",
    updatedAt: "2025-12-25",
  }

  
  function getSeverityStyle(severity: string) {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  }
  
  function getStatusStyle(status: string) {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
  
function RiskCard() {
  return (
  <div className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
  {/* Accent line for severity */}
  <span
    className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${
      risk.severity === "Critical"
        ? "bg-red-600"
        : risk.severity === "High"
        ? "bg-orange-500"
        : risk.severity === "Medium"
        ? "bg-yellow-400"
        : "bg-green-500"
    }`}
  />

  {/* Header */}
  <div className="flex items-start justify-between gap-4">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
        {risk.title}
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        Project : Build software • Owner: {risk.employee}
      </p>
    </div>

    <div className="flex flex-col items-end gap-1">
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${getSeverityStyle(
          risk.severity
        )}`}
      >
        {risk.severity}
      </span>
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
          risk.status
        )}`}
      >
        {risk.status}
      </span>
    </div>
  </div>

  {/* Divider */}
  <div className="my-4 h-px bg-gray-100" />

  {/* Body */}
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-700">
      Mitigation Plan
    </p>
    <p className="text-sm text-gray-600 leading-relaxed">
      {risk.mitigationPlan}
    </p>
  </div>

  {/* Footer */}
  <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
    <span>
      Created on{" "}
      <span className="font-medium text-gray-700">
        {risk.createdAt}
      </span>
    </span>

    {risk.resolvedAt ? (
      <span className="font-medium text-green-600">
        Resolved on {risk.resolvedAt}
      </span>
    ) : (
      <span className="italic text-gray-400">
        Not resolved yet
      </span>
    )}
  </div>
</div>

  )
}

export default RiskCard