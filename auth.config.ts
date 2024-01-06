import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/users";
import { loginSchema } from "./schema";

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const verifiedCredentials = loginSchema.safeParse(credentials);
        if (!verifiedCredentials.success) return null;
        const { email, password } = verifiedCredentials.data;

        //
        const existingUser = await getUserByEmail(email);

        // condiition
        if (!existingUser || !existingUser.password) return null;
        if (!existingUser.emailVerified) return null;

        // check password
        const correctPassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!correctPassword) return null;

        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
