import { prisma } from "./prisma";

import crypto from "crypto";

export default async function generate2FactToken(email: string) {
  //
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  const getToken = await prisma.twoFactorToken.findFirst({
    where: {
      email,
    },
  });

  if (getToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: getToken.id,
      },
    });
  }

  return await prisma.twoFactorToken.create({
    data: {
      email,
      expires,
      token,
    },
  });
}
