import { getVerificationTokenByEmail } from "@/data/verification-token";
import { prisma } from "./prisma";
import { v4 as uuidv4 } from "uuid";

export async function generateVerificationToken(email: string) {
  const existingVerificationToken = await getVerificationTokenByEmail(email);

  //
  const token = uuidv4();
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  if (existingVerificationToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingVerificationToken.id,
      },
    });
  }

  const newVerificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return newVerificationToken;
}
