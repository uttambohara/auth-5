"use server";

import { LoginSchema, loginSchema } from "@/schema";

export async function login(values: LoginSchema) {
  const validatedValues = loginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid fields..." };
  }

  return { success: "Email sent" };
}
