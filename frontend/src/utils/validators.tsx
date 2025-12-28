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

const validators = {
  loginSchema,
  createProjectSchema,
};

export default validators;
