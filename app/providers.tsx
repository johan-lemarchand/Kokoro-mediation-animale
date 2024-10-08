"use client";

import { Toaster } from "@/components/ui/sonner";
import { AlertDialogRenderer } from "@/features/alert-dialog/AlertDialogRenderer";
import { SearchParamsMessageToastSuspended } from "@/features/searchparams-message/SearchParamsMessageToast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { env } from "@/lib/env";
import { LoadingProvider } from '@/contexts/LoadingContext';
import { EditableContentProvider } from "@/contexts/EditableContentContext";

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
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <LoadingProvider>
              <EditableContentProvider>
                <Toaster />
                <AlertDialogRenderer />
                <SearchParamsMessageToastSuspended />
                {children}
              </EditableContentProvider>
              </LoadingProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  );
};
