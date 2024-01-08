import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { getUsersByEmail } from "./data/users";
import { getVerificationTokenByEmail } from "./data/verification-token";
import { prisma } from "./lib/prisma";
import { loginSchema } from "./schema";

export default {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credential) {
        const verifiedCredentials = loginSchema.safeParse(credential);
        if (!verifiedCredentials.success) return null;
        //
        const { email, password } = verifiedCredentials.data;
        const existingUser = await getUsersByEmail(email);
        if (!existingUser || !existingUser.password) return null;

        // Email verfieid
        if (!existingUser.emailVerified) return null;

        // Delete token after verification
        if (existingUser.email) {
          const existingVerifiationToken = await getVerificationTokenByEmail(
            email
          );

          if (existingVerifiationToken) {
            await prisma.verifiationToken.delete({
              where: {
                id: existingVerifiationToken.id,
              },
            });
          }
        }

        const correctPassword = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!correctPassword) return null;

        const existingTwoFactorConfirmation =
          await prisma.twoFactorConfirmation.findFirst({
            where: {
              userId: existingUser.id,
            },
          });

        if (!existingTwoFactorConfirmation) return null;

        await prisma.twoFactorConfirmation.delete({
          where: {
            userId: existingUser.id,
          },
        });

        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
