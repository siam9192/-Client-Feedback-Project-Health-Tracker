import React from "react";

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
}

interface ActivityGroup {
  date: string;
  activities: Activity[];
}

const activityData: ActivityGroup[] = [
  {
    date: "Today",
    activities: [
      {
        id: 1,
        user: "Arafat Hasan",
        action: "Updated project progress to 62%",
        time: "10:15 AM",
      },
      {
        id: 2,
        user: "Rony",
        action: "Added new task: API integration",
        time: "9:40 AM",
      },
    ],
  },
  {
    date: "Yesterday",
    activities: [
      {
        id: 3,
        user: "Sara Khan",
        action: "Submitted weekly report",
        time: "6:20 PM",
      },
      {
        id: 4,
        user: "Siam Hasan",
        action: "Marked task as completed",
        time: "4:05 PM",
      },
    ],
  },
  {
    date: "Dec 22, 2025",
    activities: [
      {
        id: 5,
        user: "Rony",
        action: "Created new milestone",
        time: "11:30 AM",
      },
    ],
  },
];

function ActivitiesDialog() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Project Activities
          </h2>
          <button className="text-gray-400 hover:text-gray-600 text-xl">
            ✕
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
          {activityData.map((group) => (
            <div key={group.date}>
              {/* Date */}
              <p className="text-sm font-medium text-gray-500 mb-3">
                {group.date}
              </p>

              <div className="space-y-4 border-l-2 border-gray-200 pl-4">
                {group.activities.map((activity) => (
                  <div key={activity.id} className="relative">
                    {/* Dot */}
                    <span className="absolute -left-[9px] top-2 w-3 h-3 bg-indigo-600 rounded-full"></span>

                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesDialog;
