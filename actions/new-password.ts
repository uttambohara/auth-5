"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUsersByEmail } from "@/data/users";
import { prisma } from "@/lib/prisma";
import { NewPasswordSchema, newPasswordSchema } from "@/schema";
import bcrypt from "bcryptjs";

export default async function newPassword(
  values: NewPasswordSchema,
  token: string | null
) {
  if (!token) return { error: "Token not found...." };

  const verifiedValues = newPasswordSchema.safeParse(values);
  if (!verifiedValues.success) return { error: "Invalid credentials..." };

  const { password } = verifiedValues.data;

  const passwordResetToken = await getPasswordResetTokenByToken(token);
  if (!passwordResetToken)
    return { error: "Password reset token doesn't exist....." };

  const hasExpired = new Date(passwordResetToken.expires) < new Date();
  if (hasExpired) return { error: "The password reset token has expired...." };

  const existingUser = await getUsersByEmail(passwordResetToken.email);
  if (!existingUser) return { error: "User doesn't exist...." };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: {
      id: passwordResetToken.id,
    },
  });

  return { success: "Password has been updated..." };
}
