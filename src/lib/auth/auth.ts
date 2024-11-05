/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import { env } from "../env";
import { prisma } from "../prisma";
import { getNextAuthConfigProviders } from "./getNextAuthConfigProviders";

export const { handlers, auth: baseAuth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/org",
  },
  adapter: PrismaAdapter(prisma),
  providers: getNextAuthConfigProviders(),
  session: {
    strategy: "database",
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async session(params) {
      if (params.newSession) return params.session;

      const typedParams = params as unknown as {
        session: Session;
        user?: User;
      };

      if (!typedParams.user) return typedParams.session;

      typedParams.user.passwordHash = null;

      return typedParams.session;
    },
  },
  events: {
    createUser: async (message) => {
      const user = message.user;

      if (!user.email) {
        return;
      }
    },
  },
});
