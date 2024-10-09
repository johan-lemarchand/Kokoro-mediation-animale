"use client";

import React from 'react';
import { LandingHeader } from '@/features/landing/LandingHeader';
import { usePathname } from 'next/navigation';
import { Footer } from "@/features/layout/Footer";


export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGalleryPage = pathname === '/galerie';

  return (
    <>
      <LandingHeader isGalleryPage={isGalleryPage} />
      <main className="pt-28">
        {children}
      </main>
      <Footer />
    </>
  );
}