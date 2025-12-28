import z from "zod";

const loginSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be at most 100 characters"),

  description: z.string().min(5, "Description must be at least 5 characters"),

  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start date",
  }),

  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid end date",
  }),

  clientId: z.string().nonempty("Client is required"),

  employeeIds: z.array(z.string()).min(1, "At least one employee must be assigned to the project"),
});


const createEmployeeCheckinSchema = z.object({
  progressSummary: z.string().min(5, 'Summary must be at least 5 characters'),
  blockers: z.string().optional(),
  confidenceLevel:  z.int().min(1, { message: "Confidence level must be between 1 and 5" })
  .max(5, { message: "Confidence level must be between 1 and 5" }),
  completePercentage: z.number().min(1, { message: "Completion percentage must be between 1 and 100" })
  .max(100, { message: "Completion percentage must be between 1 and 100" }),
  projectId: z.string().nonempty('Project ID is required')
});


const validators = {
  loginSchema,
  createProjectSchema,
  createEmployeeCheckinSchema
};

export default validators;
