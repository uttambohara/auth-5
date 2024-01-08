import * as z from "zod";

export const loginSchema = z.object({
  code: z.optional(z.string()),
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const forgetPasswordSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export const newPasswordSchema = z.object({
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
