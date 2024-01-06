"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/verification-email";
import { LoginSchema, loginSchema } from "@/schema";
import { AuthError } from "next-auth";

export async function login(values: LoginSchema) {
  const validatedValues = loginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid fields..." };
  }

  const { email, password } = validatedValues.data;

  //
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser || !existingUser.email) return { error: "User not found!" };

  if (!existingUser.emailVerified) {
    const createVerification = await generateVerificationToken(email);
    //
    if (createVerification.token) {
      await sendVerificationEmail(email, createVerification.token);
    }

    return { success: "Email not verified, so verification link sent..." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong..." };
      }
    }
    throw err;
  }

  return { success: "Email sent" };
}
