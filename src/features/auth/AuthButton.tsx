'use client'

import { useSession } from "next-auth/react";
import { LoggedInButton, SignInButton } from "./SignInButton";
import type { User } from "@prisma/client";

export function AuthButton() {
  const { data: session, status } = useSession();
  const user = session?.user as User | null;

  if (status === "loading") {
    return null;
  }

  if (user) {
    return <LoggedInButton user={user} />;
  }

  return <SignInButton />;
}
