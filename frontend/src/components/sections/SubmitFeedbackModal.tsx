"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import validators from "@/utils/validators";
import useMutation from "@/hooks/useMutation";
import { createClientFeedback } from "@/services/api/client-feedback.api.service";

const satisfactionRatingOptions = [
  { value: 1, label: "1 – Very Dissatisfied" },
  { value: 2, label: "2 – Dissatisfied" },
  { value: 3, label: "3 – Neutral" },
  { value: 4, label: "4 – Satisfied" },
  { value: 5, label: "5 – Very Satisfied" },
];
const communicationRatingOptions = [
  { value: 1, label: "1 – Very Unclear" },
  { value: 2, label: "2 – Unclear" },
  { value: 3, label: "3 – Neutral" },
  { value: 4, label: "4 – Clear" },
  { value: 5, label: "5 – Very Clear" },
];

type FeedbackForm = z.infer<typeof validators.createClientFeedbackSchema>;

interface Props {
  projectId: string;
}

export default function SubmitFeedbackModal({ projectId }: Props) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackForm>({
    resolver: zodResolver(validators.createClientFeedbackSchema),
    defaultValues: {
      projectId,
      satisfactionRating: 3,
      communicationRating: 3,
      comment: "",
      issueDescription: "",
    },
  });

  const { mutate, isLoading } = useMutation(createClientFeedback);

  const onSubmit = (data: FeedbackForm) => {
    if (!data.comment) delete data.comment;
    if (!data.issueDescription) delete data.issueDescription;
    mutate(data, {
      onSuccess: () => {
        toast.success("Feedback submitted successfully");
        reset();
        setOpen(false);
      },
      onError: (err) => {
        toast.error(err.message || "Failed to submit feedback");
      },
      invalidateKeys: ["assigned-projects"],
    });
  };

  const { satisfactionRating } = watch();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-primary hover:text-secondary font-semibold text-sm"
      >
        Submit Feedback
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Weekly Project Feedback</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-secondary">
              {/* Satisfaction Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Satisfaction Rating
                </label>
                <select
                  {...register("satisfactionRating", { valueAsNumber: true })}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {satisfactionRatingOptions.map((val) => (
                    <option key={val.label} value={val.value}>
                      {val.label}
                    </option>
                  ))}
                </select>
                {errors.satisfactionRating && (
                  <p className="text-red-600 text-xs mt-1">{errors.satisfactionRating.message}</p>
                )}
              </div>

              {/* Communication Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Communication Clarity
                </label>
                <select
                  {...register("communicationRating", { valueAsNumber: true })}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {communicationRatingOptions.map((val) => (
                    <option key={val.label} value={val.value}>
                      {val.label}
                    </option>
                  ))}
                </select>
                {errors.communicationRating && (
                  <p className="text-red-600 text-xs mt-1">{errors.communicationRating.message}</p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment (Optional)
                </label>
                <textarea
                  {...register("comment")}
                  rows={3}
                  placeholder="Share your feedback"
                  className={`w-full max-h-60 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.comment ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.comment && (
                  <p className="text-red-600 text-xs mt-1">{errors.comment.message}</p>
                )}
              </div>

              {/* Flag issue when satisfaction ratting is too low */}
              {satisfactionRating < 3 ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flag an Issue (Optional)
                  </label>
                  <textarea
                    {...register("issueDescription")}
                    rows={2}
                    placeholder="Describe any issue you want to flag"
                    className={`w-full max-h-60 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.issueDescription ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.issueDescription && (
                    <p className="text-red-600 text-xs mt-1">{errors.issueDescription.message}</p>
                  )}
                </div>
              ) : null}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
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
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
