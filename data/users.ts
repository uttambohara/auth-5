import { prisma } from "@/lib/prisma";

export async function getUsersByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}
export async function getUsersById(id: string) {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
}
