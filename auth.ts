import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import authConfig from "./auth.config";
import { getUsersById } from "./data/users";

const prisma = new PrismaClient();

export const {
  handlers: { POST, GET },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/auth/error",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account, profile }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account && account.type !== "credentials") return true;
      return true;
    },
    async session({ session, user, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      // Add id and role in JWT
      token.id = token.sub;
      const currentUser = await getUsersById(token.sub);
      if (!currentUser) return null;
      token.role = currentUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
