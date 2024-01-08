import { prisma } from "@/lib/prisma";

export async function getVerificationTokenByToken(token: string) {
  return await prisma.verifiationToken.findFirst({
    where: {
      token,
    },
  });
}

export async function getVerificationTokenByEmail(email: string) {
  return await prisma.verifiationToken.findFirst({
    where: {
      email,
    },
  });
}
export async function getVerificationTokenById(id: string) {
  return await prisma.verifiationToken.findFirst({
    where: {
      id,
    },
  });
}
