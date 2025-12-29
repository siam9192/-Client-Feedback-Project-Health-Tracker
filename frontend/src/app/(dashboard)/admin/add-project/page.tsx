"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import validators from "@/utils/validators";
import AddProjectClientDialog from "@/components/sections/AddProjectClientDialog";
import AddProjectEmployeeDialog from "@/components/sections/AddProjectEmployeeDialog";
import { DEFAULT_PROFILE_PICTURE } from "@/utils/constant";
import { Client, Employee } from "@/types/user.type";
import z from "zod";
import PageHeading from "@/components/ui/PageHeading";
import useMutation from "@/hooks/useMutation";
import { createProject } from "@/services/api/project.api.service";
import { toast } from "sonner";

type CreateProjectForm = z.infer<typeof validators.createProjectSchema>;

export default function AddProjectPage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(validators.createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      clientId: "",
      employeeIds: [],
    },
  });

  const [client, setClient] = useState<Client | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [addClient, setAddClient] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);

  const removeEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e._id !== id));
  };

  const { mutate, isLoading } = useMutation(createProject);

  const onSubmit = async (data: CreateProjectForm) => {
    mutate(data, {
      onSuccess: () => {
        (toast.success("Project added successfully"), reset());
        setClient(null);
        setEmployees([]);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  useEffect(() => {
    setValue("clientId", client?._id ?? "");

    setValue("employeeIds", employees.length > 0 ? employees.map((emp) => emp._id) : []);
  }, [client, employees]);
  return (
    <div className="mx-auto max-w-4xl ">
      <PageHeading title="Add New Project" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100 font-secondary"
      >
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ">Project Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter project name"
            className={`w-full border rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            {...register("description")}
            placeholder="Brief description of the project"
            rows={4}
            className={`w-full border rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-72 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              className={`w-full border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.startDate && (
              <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              {...register("endDate")}
              className={`w-full border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.endDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.endDate && (
              <p className="text-red-600 text-sm mt-1">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        {/* Client Selector */}
        <div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">Client</label>
            <button
              type="button"
              onClick={() => setAddClient(true)}
              className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-indigo-50 transition"
            >
              <Plus size={20} />
              {client && (
                <div className="flex gap-4 items-center">
                  <img
                    src={DEFAULT_PROFILE_PICTURE}
                    alt=""
                    className="size-8 rounded-full object-cover outline-2 outline-offset-1 outline-secondary"
                  />
                  <div className="text-start">
                    <span>{client.name}</span>
                    <br />
                    <span className="font-medium text-gray-500">{client.user?.email}</span>
                  </div>
                </div>
              )}
              {!client && <span className="text-gray-500">Select Client</span>}
            </button>
          </div>
          {errors.clientId && (
            <p className="text-red-600 text-sm mt-1">{errors.clientId.message}</p>
          )}
        </div>

        {/* Employees Selector */}
        <div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">Assigned Employees</label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setAddEmployee(true)}
                className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-indigo-50 transition"
              >
                <Plus size={20} />
                <span>
                  {employees.length > 0 ? `${employees.length} selected` : "Add employees"}
                </span>
              </button>

              {/* Selected employees display */}
              {employees.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {employees.map((emp) => (
                    <div
                      key={emp._id}
                      className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full text-sm"
                    >
                      <img
                        src={DEFAULT_PROFILE_PICTURE}
                        alt={emp.name}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span>{emp.name}</span>
                      <button
                        type="button"
                        onClick={() => removeEmployee(emp._id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {errors.employeeIds && (
            <p className="text-red-600 text-sm mt-1">{errors.employeeIds.message}</p>
          )}
        </div>
        {/* Submit */}
        <div className="flex justify-end mt-4 font-primary">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>

      {/* Dialogs */}
      {addClient && (
        <AddProjectClientDialog
          selectedClientId={client}
          onClose={(selectedClient) => {
            setAddClient(false);
            if (selectedClient) setClient(selectedClient);
          }}
        />
      )}

      {addEmployee && (
        <AddProjectEmployeeDialog
          selectedEmployees={employees}
          onClose={(emp) => {
            setAddEmployee(false);
            if (emp) setEmployees((p) => [...p, emp]); // emp is array from dialog
          }}
        />
      )}
    </div>
  );
}
