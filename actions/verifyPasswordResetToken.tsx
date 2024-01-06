"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/users";
import { prisma } from "@/lib/prisma";
import { newPasswordSchema } from "@/schema";
import bcrypt from "bcryptjs";

export default async function resetPasswordToken(
  token: string,
  password: string
) {
  if (!token) return { error: "No token found..." };

  //
  const exisitingToken = await getPasswordResetTokenByToken(token);
  if (!exisitingToken)
    return { error: "Provided token not found in the server..." };

  //
  const hasExpired = new Date(exisitingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired..." };

  if (!exisitingToken.email)
    return { error: "Provided email doesn't exist in the server..." };

  const exisitingUser = await getUserByEmail(exisitingToken.email);
  if (!exisitingUser) return { error: "User doesn't exist in the server..." };

  const hashNewPassword = await bcrypt.hash(password, 10);

  await prisma.resetToken.delete({
    where: {
      id: exisitingToken.id,
    },
  });

  await prisma.user.update({
    where: {
      id: exisitingUser.id,
    },
    data: {
      password: hashNewPassword,
    },
  });

  return { success: "Password has been changed sucessfully...." };
}
