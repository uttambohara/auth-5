"use server";

import { LoginSchemaT, loginSchema } from "@/schemas";

export async function login(values: LoginSchemaT) {
  const validatedValues = loginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent" };
}
