'use client';

import { ReactNode, useEffect } from "react";
import { GlobalLoading } from '@/features/commmon/GlobalLoading';
import { useLoading } from '@/contexts/LoadingContext';

interface ClientRootLayoutContentProps {
  children: ReactNode;
}

export function ClientRootLayoutContent({ children }: ClientRootLayoutContentProps) {
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [setLoading]);

  return (
    <>
      {isLoading && <GlobalLoading />}
      {!isLoading && children}
    </>
  );
}
