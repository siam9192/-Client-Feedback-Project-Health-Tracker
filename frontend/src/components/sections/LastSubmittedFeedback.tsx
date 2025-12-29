"use client";
import { ClientFeedback, IssueStatus } from "@/types/client-feedback.type";
import useQuery from "@/hooks/useQuery";
import { IResponse } from "@/types/response.type";
import { getLatestClientFeedback } from "@/services/api/client-feedback.api.service";

function LastSubmittedFeedback() {
  const { data } = useQuery<IResponse<ClientFeedback>>("latest-feedback", () =>
    getLatestClientFeedback(),
  );

  const feedback = data?.data;

  if (!feedback) {
    return (
      <div className="bg-white shadow rounded-lg p-6 mt-10 w-1/2">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Last Submitted Feedback</h2>

        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">No feedback has been submitted yet.</p>
        </div>
      </div>
    );
  }

  const issueStatusColor: Record<IssueStatus, string> = {
    open: "text-red-600 bg-red-50 border-red-200",
    in_progress: "text-amber-600 bg-amber-50 border-amber-200",
    resolved: "text-emerald-600 bg-emerald-50 border-emerald-200",
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-10 w-1/2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Last Submitted Feedback</h2>
          <p className="text-sm text-gray-500">
            Week {feedback.week}, {feedback.year}
          </p>
        </div>

        <span className="text-sm text-gray-400">
          {new Date(feedback.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Project Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">Project</p>
        <p className="font-medium text-gray-800">{feedback.project.name}</p>
      </div>

      {/* Ratings */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Satisfaction</p>
          <p className="text-lg font-semibold text-indigo-600">{feedback.satisfactionRating} / 5</p>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Communication</p>
          <p className="text-lg font-semibold text-emerald-600">
            {feedback.communicationRating} / 5
          </p>
        </div>
      </div>

      {/* Comment */}
      {feedback.comment && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Comment</p>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{feedback.comment}</p>
        </div>
      )}

      {/* Issue Section */}
      {feedback.issueFlagged && feedback.issue && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Flagged Issue</p>

          {/* Issue Description Box */}
          <div
            className={`p-3 rounded-lg border text-sm ${issueStatusColor[feedback.issue.status]}`}
          >
            {feedback.issue.description}
          </div>

          {/* Status and ResolvedAt outside of the box */}
          <div className="mt-2 text-xs font-medium uppercase text-gray-700">
            <p>Status: {feedback.issue.status.replace("_", " ")}</p>
            {feedback.issue.resolvedAt && (
              <p className="text-gray-500">
                Resolved on {new Date(feedback.issue.resolvedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LastSubmittedFeedback;
