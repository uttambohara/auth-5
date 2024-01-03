import * as z from "zod";

// Login
export const loginSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export type LoginSchemaT = z.infer<typeof loginSchema>;

// Signup
export const signupSchema = z.object({
  name: z.string().min(5),
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export type SignupSchemaT = z.infer<typeof signupSchema>;
