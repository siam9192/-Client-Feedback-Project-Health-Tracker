import z from "zod";

const loginSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

const validators = {
  loginSchema,
};

export default validators;
