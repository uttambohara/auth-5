"use server";

import { getUserByEmail } from "@/data/users";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/verification-email";
import { RegisterSchema, registerSchema } from "@/schema";
import bcrypt from "bcryptjs";

export async function register(values: RegisterSchema) {
  const validatedValues = registerSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid fields..." };
  }

  const { name, email, password } = validatedValues.data;

  //
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use..." };

  //
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 2FA
  const createVerification = await generateVerificationToken(email);
  //
  if (createVerification.token) {
    await sendVerificationEmail(email, createVerification.token);
  }

  return { success: "Verification email sent..." };
}
