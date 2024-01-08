"use server";

import { signIn } from "@/auth";
import { getUsersByEmail } from "@/data/users";
import send2FactCode from "@/lib/email-2Fac-code";
import sendEmailVerificationToken from "@/lib/email-verification-token";
import generate2FactToken from "@/lib/generate-2Fact-token";
import { generateVerificationToken } from "@/lib/generate-verification-token";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOGIN_URL } from "@/routes";
import { LoginSchema, loginSchema } from "@/schema";
import { AuthError } from "next-auth";

export async function login(values: LoginSchema) {
  //
  const verifiedLogin = loginSchema.safeParse(values);
  if (!verifiedLogin.success) return { error: "Invalid credentials.." };
  const { code, email, password } = verifiedLogin.data;

  //
  const existingUser = await getUsersByEmail(email);

  if (!existingUser)
    return { error: "User with that email not found in the server...." };

  const exisitingOAuthAccount = await prisma.account.findFirst({
    where: {
      userId: existingUser.id,
    },
  });

  // TODO
  if (exisitingOAuthAccount) {
    return { error: "Email already taken in OAuth...." };
  }
  //
  if (!existingUser.emailVerified) {
    const createdToken = await generateVerificationToken(email);
    await sendEmailVerificationToken(email, createdToken.token);
    return {
      success: "Unverfied. Check your email....",
    };
  }

  if (existingUser.isTwoFactorAuthenticated) {
    if (!code) {
      const twoFactorCode = await generate2FactToken(email);
      await send2FactCode(email, twoFactorCode.token);

      return { success: "twoFactorEnabled" };
    } else {
      const existingTwoFactorCode = await prisma.twoFactorToken.findFirst({
        where: {
          email,
        },
      });

      // check code
      if (!existingTwoFactorCode)
        return { error: "Two factor code doesn't exist in the system..." };
      const isCorrect = existingTwoFactorCode.token === code;

      if (!isCorrect) return { error: "Two factor code is incorrect..." };

      const hasExpired = new Date(existingTwoFactorCode.expires) < new Date();
      if (hasExpired) return { error: "The provided token has expired..." };

      const existingUser = await getUsersByEmail(existingTwoFactorCode.email);
      if (!existingUser) return { error: "User no longer exists..." };

      const existingTwoFactorConfirmation =
        await prisma.twoFactorConfirmation.findFirst({
          where: {
            userId: existingUser.id,
          },
        });

      if (existingTwoFactorConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            userId: existingUser.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    }
  }

  // Send signin details to credential provider
  try {
    await signIn("credentials", {
      email,
      password,
      code,
      redirectTo: DEFAULT_LOGIN_URL,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid login details...." };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw err;
  }

  return { success: "Verification email sent...." };
}
