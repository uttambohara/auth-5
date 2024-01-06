import { DefaultSession } from "next-auth";
import { string } from "zod";

type TExtendedUser = DefaultSession["user"] & {
  id: string;
  role: string;
};

declare module "next-auth" {
  interface Session {
    /** The user's postal address. */
    user: TExtendedUser;
  }
}
