"use server";

import { getUsersByEmail } from "@/data/users";
import sendEmailVerificationToken from "@/lib/email-verification-token";
import { generateVerificationToken } from "@/lib/generate-verification-token";
import { prisma } from "@/lib/prisma";
import { RegisterSchema, registerSchema } from "@/schema";
import bcrypt from "bcryptjs";

export async function register(values: RegisterSchema) {
  const verifiedLogin = registerSchema.safeParse(values);

  if (!verifiedLogin.success) return { error: "Invalid credentials.." };

  const { name, email, password } = verifiedLogin.data;

  // Check if email exists
  const existingUser = await getUsersByEmail(email);

  if (existingUser)
    return { error: "User with that email exists in the server..." };

  // Create a new user
  const hashedPassword = await bcrypt.hash(password, 10);

  // Verification token

  const createdToken = await generateVerificationToken(email);
  await sendEmailVerificationToken(email, createdToken.token);

  //
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Verification email sent...." };
}
