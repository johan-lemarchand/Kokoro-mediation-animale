import { NextTopLoader } from "@/features/page/NextTopLoader";
import { getServerUrl } from "@/lib/server-url";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/site-config";
import type { LayoutParams } from "@/types/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import type { ReactNode } from "react";
import "./code-theme.scss";
import "./globals.scss";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title:
    'Kokoro Médiation Animale | Bien-être par la Médiation Animale dans le Bas-Rhin en Alsace',
  description:
    'Découvrez Kokoro Médiation Animale, spécialiste en médiation animale dans le Bas-Rhin, en Alsace. Nous offrons des services de bien-être, de développement personnel et de renforcement de la confiance en soi grâce à des interactions enrichissantes avec les animaux. Basés en région Bas-Rhin, nous sensibilisons au respect des animaux et développons des apprentissages pour tous, adaptés à votre environnement local.',
  keywords:
    'médiation animale, bien-être animal, confiance en soi, développement personnel, respect des animaux, apprentissage, interactions animales, Kokoro',
  robots: 'index, follow',
  metadataBase: new URL(getServerUrl()),
};

export default function RootLayout({
  children,
  modal,
}: LayoutParams & { modal?: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <PlausibleProvider domain={SiteConfig.domain} />
        <title>médiation par l'animal</title>
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "h-full bg-background font-sans antialiased",
          GeistMono.variable,
          GeistSans.variable,
        )}
      >
        <Providers>
          <NextTopLoader
            delay={100}
            showSpinner={false}
            color="hsl(var(--primary))"
          />
            {children}
            {modal}
        </Providers>
      </body>
    </html>
  );
}
