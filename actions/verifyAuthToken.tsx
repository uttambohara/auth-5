"use server";

import { getUserByEmail } from "@/data/users";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/prisma";

export default async function verifyAuthToken(token: string) {
  if (!token) return { error: "No token found..." };

  //
  const exisitingToken = await getVerificationTokenByToken(token);
  if (!exisitingToken) return { error: "No token found in the server..." };

  //
  const hasExpired = new Date(exisitingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired..." };

  if (!exisitingToken.email)
    return { error: "Provided email doesn't exist in the server..." };

  const exisitingUser = await getUserByEmail(exisitingToken.email);
  if (!exisitingUser) return { error: "User doesn't exist in the server..." };

  await prisma.user.update({
    where: {
      id: exisitingUser.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: exisitingToken.id,
    },
  });

  return { success: "Email has been verified...." };
}
