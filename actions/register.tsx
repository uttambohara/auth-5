"use server";

import { RegisterSchema, registerSchema } from "@/schema";

export async function register(values: RegisterSchema) {
  const validatedValues = registerSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid fields..." };
  }

  const { name, email, password } = validatedValues.data;

  return { success: "Email sent" };
}
