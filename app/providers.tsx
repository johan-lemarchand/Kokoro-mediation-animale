"use client";

import { Toaster } from "@/components/ui/sonner";
import { AlertDialogRenderer } from "@/features/alert-dialog/AlertDialogRenderer";
import { GlobalDialogLazy } from "@/features/global-dialog/GlobalDialogLazy";
import { SearchParamsMessageToastSuspended } from "@/features/searchparams-message/SearchParamsMessageToast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { env } from "@/lib/env";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={env.NEXT_PUBLIC_SITE_KEY_RECAPTCHA}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <AlertDialogRenderer />
          <GlobalDialogLazy />
          <SearchParamsMessageToastSuspended />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
    </GoogleReCaptchaProvider>
  );
};
