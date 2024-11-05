import type { User } from "@prisma/client";
import { baseAuth } from "./auth";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const auth = async () => {
  const session = await baseAuth();
  return session?.user as User | null;
};

export const requiredAuth = async () => {
  const user = await auth();
  if (!user) {
    throw new AuthError("You must be authenticated to access this resource.");
  }
  return user;
};
