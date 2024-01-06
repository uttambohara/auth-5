import { prisma } from "@/lib/prisma";

export async function getPasswordResetTokenByToken(token: string) {
  return await prisma.resetToken.findFirst({
    where: {
      token,
    },
  });
}

export async function getPasswordResetTokenByEmail(email: string) {
  return await prisma.resetToken.findFirst({
    where: {
      email,
    },
  });
}
