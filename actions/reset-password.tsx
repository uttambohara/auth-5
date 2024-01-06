"use server";

import { getUserByEmail } from "@/data/users";
import { sendPasswordResetToken } from "@/lib/password-reset-email";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ForgetPasswordSchema, forgetPasswordSchema } from "@/schema";

export default async function resetPassword(values: ForgetPasswordSchema) {
  const verifiedValues = forgetPasswordSchema.safeParse(values);

  if (!verifiedValues.success) return { error: "Invalid credentials..." };

  //
  const { email } = verifiedValues.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser)
    return { error: "User with the provided email doesn't exist!" };

  const resetToken = await generatePasswordResetToken(email);
  if (resetToken.token) {
    await sendPasswordResetToken(email, resetToken.token);
  }

  return { success: "Password reset link sent to your email....." };
}
