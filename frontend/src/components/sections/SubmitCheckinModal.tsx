"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import validators from "@/utils/validators";
import React, { useState } from "react";
import useMutation from "@/hooks/useMutation";
import { createEmployeeCheckin } from "@/services/api/employee-checkin.api.service";
import { toast } from "sonner";

type CheckInForm = z.infer<typeof validators.createEmployeeCheckinSchema>;

interface Props {
  projectId: string;
  progress: number;
}

export default function SubmitCheckinModal({ projectId, progress }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckInForm>({
    resolver: zodResolver(validators.createEmployeeCheckinSchema),
    defaultValues: {
      projectId,
      progressSummary: "",
      confidenceLevel: 3,
      completePercentage: 0,
    },
  });

  const [open, setOpen] = useState(false);

  const { mutate, isLoading } = useMutation(createEmployeeCheckin);
  const onSubmit = (data: CheckInForm) => {
    if (!data.blockers) delete data.blockers;
    mutate(data, {
      onSuccess: () => {
        toast.success("Checkin submitted successfully");
        reset();
        setOpen(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
      invalidateKeys: ["missing-checkin-projects", "assigned-projects"],
    });
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2  text-primary hover:text-secondary font-semibold text-sm "
      >
        Checkin
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Submit Project Check-in</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-secondary">
              {/* Progress Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progress Summary
                </label>
                <textarea
                  {...register("progressSummary")}
                  rows={3}
                  placeholder="Summarize progress"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-60 ${
                    errors.progressSummary ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.progressSummary && (
                  <p className="text-red-600 text-xs mt-1">{errors.progressSummary.message}</p>
                )}
              </div>

              {/* Blockers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blockers (Optional)
                </label>
                <textarea
                  {...register("blockers")}
                  rows={2}
                  placeholder="Mention any blockers"
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-60"
                />
              </div>

              {/* Confidence Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confidence Level
                </label>
                <select
                  {...register("confidenceLevel", { valueAsNumber: true })}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={3}
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.confidenceLevel && (
                  <p className="text-red-600 text-xs mt-1">{errors.confidenceLevel.message}</p>
                )}
              </div>

              {/* Completion Percentage */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Completion %</label>
                  <span className="text-sm text-green-500 font-medium">
                    Remaining {100 - progress}%
                  </span>
                </div>

                <input
                  type="number"
                  {...register("completePercentage", { valueAsNumber: true })}
                  min={0}
                  max={100}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.completePercentage && (
                  <p className="text-red-600 text-xs mt-1">{errors.completePercentage.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-primary"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
