"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import validators from "@/utils/validators";
import useMutation from "@/hooks/useMutation";
import { createRisk } from "@/services/api/risk.api.service";
import { ProjectRiskSeverity, ProjectRiskStatus } from "@/types/risk.type";

type AddRiskForm = z.infer<typeof validators.createRiskSchema>;

interface Props {
  projectId: string;
}

export default function AddRiskModal({ projectId }: Props) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddRiskForm>({
    resolver: zodResolver(validators.createRiskSchema),
    defaultValues: {
      projectId,
      severity: ProjectRiskSeverity.MEDIUM,
      status: ProjectRiskStatus.OPEN,
    },
  });

  const { mutate, isLoading } = useMutation(createRisk);

  const onSubmit = (data: AddRiskForm) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Risk added successfully");
        reset();
        setOpen(false);
      },
      onError: (err) => {
        toast.error(err.message || "Failed to add risk");
      },
      invalidateKeys: ["assigned-projects"],
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-red-500 hover:text-secondary font-semibold text-sm"
      >
        Add Risk
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Add Project Risk</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-secondary ">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Title</label>
                <input
                  {...register("title")}
                  placeholder="Short risk title"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <select
                  {...register("severity")}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.severity && (
                  <p className="text-red-600 text-xs mt-1">{errors.severity.message}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.values(ProjectRiskStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-red-600 text-xs mt-1">{errors.status.message}</p>
                )}
              </div>

              {/* Mitigation Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mitigation Plan
                </label>
                <textarea
                  {...register("mitigationPlan")}
                  rows={3}
                  placeholder="How will this risk be handled?"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.mitigationPlan ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mitigationPlan && (
                  <p className="text-red-600 text-xs mt-1">{errors.mitigationPlan.message}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 font-primary"
                >
                  {isSubmitting ? "Saving..." : "Add Risk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
