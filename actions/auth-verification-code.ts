"use server";

import { getUsersByEmail } from "@/data/users";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/prisma";

export default async function authVerificationCode(token: string) {
  //

  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken)
    return { error: "Token doesn't exist in the system...." };

  const hasExpired = new Date(exisitingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired...." };

  const existingUser = await getUsersByEmail(exisitingToken.email);
  if (!existingUser)
    return { error: "The user doesn't exist in the system...." };

  //
  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  return { success: "Email verified" };
}
