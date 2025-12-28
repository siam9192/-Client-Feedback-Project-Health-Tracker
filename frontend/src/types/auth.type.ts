import validators from "@/utils/validators";
import z from "zod";

export type LoginPayload = z.infer<typeof validators.loginSchema>;
