import { prisma } from "@/lib/prisma";

export async function getVerificationTokenByToken(token: string) {
  return await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });
}

export async function getVerificationTokenByEmail(email: string) {
  return await prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });
}
