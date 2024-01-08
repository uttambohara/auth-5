import { prisma } from "@/lib/prisma";

export async function getPasswordResetTokenByToken(token: string) {
  return await prisma.passwordResetToken.findFirst({
    where: {
      token,
    },
  });
}

export async function getPasswordResetTokenByEmail(email: string) {
  return await prisma.passwordResetToken.findFirst({
    where: {
      email,
    },
  });
}
export async function getPasswordResetTokenId(id: string) {
  return await prisma.passwordResetToken.findFirst({
    where: {
      id,
    },
  });
}
