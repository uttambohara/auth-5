import { getVerificationTokenByEmail } from "@/data/verification-token";
import { prisma } from "./prisma";
import { v4 as uuidv4 } from "uuid";

export async function generateVerificationToken(email: string) {
  const exisitingToken = await getVerificationTokenByEmail(email);

  //
  const createdToken = uuidv4();
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  //   Clear old token
  if (exisitingToken) {
    await prisma.verifiationToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }

  //   Generate a new one
  return await prisma.verifiationToken.create({
    data: {
      email,
      token: createdToken,
      expires,
    },
  });
}
