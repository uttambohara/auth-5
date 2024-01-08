import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    /** The user's postal address. */
    user: ExtendedUser;
  }
}
