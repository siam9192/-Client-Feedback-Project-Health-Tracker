"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


// --- Zod schema ---
const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be at most 100 characters"),

  description: z.string().min(5, "Description must be at least 5 characters"),

  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid start date" })
    .transform((val) => new Date(val)),

  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid end date" })
    .transform((val) => new Date(val)),

  clientId: z.string(),

  employeeIds: z
    .array(
      z.string()
    )
    .min(1, "At least one employee must be assigned to the project"),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

// --- Fake clients & employees for select inputs ---
const fakeClients = [
  { id: "64d1f6a1a2b3c4567890abcd", name: "TechNova Ltd" },
  { id: "64d1f6a1a2b3c4567890abce", name: "Alpha Corp" },
];

const fakeEmployees = [
  { id: "64d1f6a1a2b3c4567890aa01", name: "Arafat Hasan" },
  { id: "64d1f6a1a2b3c4567890aa02", name: "Rony" },
  { id: "64d1f6a1a2b3c4567890aa03", name: "Sara Khan" },
];

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      clientId: "",
      employeeIds: [],
    },
  });

  const onSubmit = (data: CreateProjectForm) => {
    console.log("Project Data:", data);
    // TODO: API call to create project
  };

  return (
    <div className="mx-auto  max-w-xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Project</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-xl shadow-md">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              {...register("endDate")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate.message}</p>}
          </div>
        </div>

        {/* Client */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
          <select
            {...register("clientId")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a client</option>
            {fakeClients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.clientId && <p className="text-red-600 text-sm mt-1">{errors.clientId.message}</p>}
        </div>

        {/* Employees */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assign Employees</label>
          <select
            {...register("employeeIds")}
            multiple
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {fakeEmployees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          {errors.employeeIds && <p className="text-red-600 text-sm mt-1">{errors.employeeIds.message}</p>}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
