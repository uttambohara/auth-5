import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./prisma";

export default async function generatePasswordResetToken(email: string) {
  const exisitingToken = await getPasswordResetTokenByEmail(email);

  //
  const createdToken = uuidv4();
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  //   Clear old token
  if (exisitingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }

  //   Generate a new one
  return await prisma.passwordResetToken.create({
    data: {
      email,
      token: createdToken,
      expires,
    },
  });
}
