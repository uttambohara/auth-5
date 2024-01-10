"use server";

import { getUserByEmail } from "@/data/users";
import { prisma } from "@/lib/prisma";
import { RegisterSchema, registerSchema } from "@/schema";
import bcrypt from "bcryptjs";

export async function register(values: RegisterSchema) {
  //
  const verifiedValues = registerSchema.safeParse(values);
  if (!verifiedValues.success) return { error: "Invalid credentials!" };
  const { name, email, password } = verifiedValues.data;

  //  Does user exists?
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already exists!" };

  // If not, create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Email registered..." };
}
