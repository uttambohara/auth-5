"use server";

import sendEmailPasswordResetToken from "@/lib/email-password-reset-token";
import generatePasswordResetToken from "@/lib/generate-password-reset-token";
import { prisma } from "@/lib/prisma";
import { ForgetPasswordSchema, forgetPasswordSchema } from "@/schema";

export async function forgotPassword(values: ForgetPasswordSchema) {
  //
  const verifiedValues = forgetPasswordSchema.safeParse(values);
  if (!verifiedValues.success) return { error: "Invalid fields..." };

  const { email } = verifiedValues.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser)
    return { error: "No user with that email exists on our system..." };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendEmailPasswordResetToken(email, passwordResetToken.token);

  return { success: "Password reset token sent.." };
}
