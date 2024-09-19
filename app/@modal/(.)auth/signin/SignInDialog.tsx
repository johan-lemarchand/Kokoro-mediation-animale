"use client";

import { LogoSvg } from "@/components/svg/LogoSvg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { SignInProviders } from "../../../auth/signin/SignInProviders";

export function SignInDialog() {
  const router = useRouter();
  const path = usePathname();

  return (
    <Dialog
      open={path.startsWith("/auth/signin")}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="bg-card">
        <DialogHeader className="flex flex-col items-center justify-center gap-2">
          <LogoSvg />
          <DialogTitle>Connectez-vous à votre compte</DialogTitle>
          <DialogDescription className="sr-only">
            Connectez-vous à votre compte pour continuer.
          </DialogDescription>
        </DialogHeader>
        <SignInProviders />
      </DialogContent>
    </Dialog>
  );
}
